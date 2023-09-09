import { SHA256 as sha256 } from "crypto-js";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export default async function handle(req, res) {
  if (req.method === "POST") {
    // create user
    // glavni poziv za create user-a
    await createUserHandler(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}
// We hash the user entered password using crypto.js
// posle se koristi gde god
export const hashPassword = (string) => {
  return sha256(string).toString();
};
// function to create user in our database
async function createUserHandler(req, res) {
  let errors = [];
  // uzima podatke iz requesta
  const { name, email, password } = req.body;

  // prva provera, da li je sifra duza od 6 char, ako nije stopiraj sve vrati error
  if (password.length < 6) {
    errors.push("password length should be more than 6 characters");
    return res.status(400).json({ errors });
  }

  // Probaj da dodas usera u prismu
  try {
    const user = await prisma.user.create({
      data: { name, email, password: hashPassword(password) },
    });
    // ako uspe vrati uspesan create
    return res.status(201).json({ message: "User created successfully", user });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ message: e.message });
      }

      return res.status(400).json({ message: e.message });
    }
    return res.status(400).send({ message: e.message });
  }
}
