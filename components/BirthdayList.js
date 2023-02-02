import { useState } from "react";
import styles from "../styles/BirthdayList.module.css";
import { birthdays } from "@/utils/getDate";
function BirthdayList() {
  const [opened, setOpened] = useState(false);

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // Generate data
  // const dataScroll = document.querySelector(".data-scroll");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // const generateData = () => {
  //   let htmlString = "";

  //   for (let i = 0; i < birthdays.length; i++) {
  //     let month = parseInt(birthdays[i].date[5] + birthdays[i].date[6]);
  //     let day = birthdays[i].date[8] + birthdays[i].date[9];

  //     htmlString += `<div class="row">
  //   <p class="name">${birthdays[i].name}</p>
  //   <div class="menu-date">
  //   <p class="menu-month">${months[month - 1]}</p>
  //   <p class="menu-day">${day}</p>
  //   </div>
  // </div>`;
  //   }
  //   dataScroll.innerHTML = htmlString;

  //   const currentDate = new Date().toString().split(" ");
  //   const today = (document.querySelector(
  //     ".date-number"
  //   ).innerHTML = `${currentDate[2]} ${currentDate[1]} ${currentDate[3]}`);
  // };
  // generateData();

  return (
    <>
      <div className={`${styles.background} ${opened ? "bgOpened" : ""}`}>
        <div className={`${styles.menu} ${opened ? "menuOpened" : ""}`}>
          <div className={styles.menuHeader}>
            <h3>Birthday list</h3>
            <p className={styles.date}>
              Current date is:
              <br />
              <span className={styles.dateNumber}>
                {day}-{month}-{year}
              </span>
            </p>
          </div>
          <div className={styles.menuLabel}>
            <p className={styles.name}>Name</p>
            <div className={styles.menuDate}>
              <p className={styles.menuMonth}>Month</p>
              <p className={styles.menuDay}>Day</p>
            </div>
          </div>
          <div className={styles.dataScroll}>
            {birthdays.map((birthday) => {
              let month = parseInt(birthday.date[5] + birthday.date[6]);
              let day = birthday.date[8] + birthday.date[9];
              return (
                <div key={birthday.id} className={styles.row}>
                  <p className={styles.name}>{birthday.name}</p>
                  <div className={styles.menuDate}>
                    <p className={styles.menuMonth}>{months[month - 1]}</p>
                    <p className={styles.menuDay}>{day}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className={`hamMenu ${opened ? "opened" : ""}`}
        onClick={() => {
          setOpened(!opened);
        }}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}

export default BirthdayList;
