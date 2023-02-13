import prisma from "./prisma";

// READ
//get unique birthday by id
export const getBirthdayById = async (id) => {
  const birthday = await prisma.birthdayDev.findUnique({
    where: {
      id,
    },
  });
  return birthday;
};

// CREATE
export const createBirthday = async (year, name, date, session) => {
  const newBirthday = await prisma.birthdayDev.create({
    data: {
      year,
      name,
      date,
    },
  });
  console.log(newBirthday);
  const birthday = await getBirthdayById(newBirthday.id);

  return birthday;
};
