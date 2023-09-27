import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export default async function handle(req, res) {
  if (req.method === "POST") {
    await deleteBirthday(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}

async function deleteBirthday(req, res) {
  const id = req.body;
  try {
    const deleteBirthday = await prisma.birthday.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Birthday deleted c:" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({ message: error.message });
    } else {
      res.status(403).json({
        err: "Error occured while deleting birthday :c",
        error: error,
      });
    }
  }
}
