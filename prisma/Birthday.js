import prisma from "./prisma";

// READ
//get unique birthday by id
export const getBirthdayById = async (id) => {
  const birthday = await prisma.birthday.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
  return birthday;
};

// CREATE
export const createBirthday = async (year, name, date, session) => {
  const newBirthday = await prisma.birthday.create({
    data: {
      year,
      name,
      date,
      user: { connect: { email: session?.user?.email } },
    },
  });
  const birthday = await getBirthdayById(newBirthday.id);

  return birthday;
};
