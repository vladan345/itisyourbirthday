export function sortByDate(array) {
  // console.log(array);
  let sorted = [...array];
  return sorted.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a.date) - new Date(b.date);
  });
}

export function checkCelebrate(array) {
  if (array) {
    let sorted = sortByDate(array);
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const nowDate = new Date(year, month, day, 0, 0, 0, 0);

    let name = "";
    sorted.forEach((birthday) => {
      let date = new Date(birthday.date);
      if (date.getTime() === nowDate.getTime()) {
        name = birthday.name;
      }
    });
    return name;
  }
}
