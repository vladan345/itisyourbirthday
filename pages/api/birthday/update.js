import prisma from "@/lib/prisma";

export default async function handle(req, res) {
  if (req.method === "POST") {
    await updateBirthday(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}

async function updateBirthday(req, res) {
  const { id, input } = req.body;

  try {
    const updateBirthday = await prisma.birthday.update({
      where: {
        id: id,
      },
      data: {
        name: input,
      },
    });
    res.status(200).json({ message: "Birthday updated c:" });
  } catch (error) {
    res.status(403).json({ err: "Error occured while updating birthday :c" });
  }
}
