import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export default async function handle(req, res) {
  if (req.method === "POST") {
    await updateBirthday(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}

async function updateBirthday(req, res) {
  let year = new Date().getFullYear();
  const { userId, date, name } = req.body;

  try {
    // const user = await prisma.user.findUnique({
    //   where: {
    //     id: userId,
    //   },
    // });
    // console.log(user);
    const createBirthday = await prisma.birthday.create({
      data: {
        name: name,
        date: date,
        year: year,
        user: {
          connect: { id: userId },
        },
      },
    });
    res.status(200).json({ message: "Birthday updated c:" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({ message: error.message });
    } else {
      res.status(403).json({
        err: "Error occured while updating birthday :c",
        error: error,
      });
    }
  }
}
