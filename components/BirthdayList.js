import { useState } from "react";
import styles from "../styles/BirthdayList.module.css";
import { sortByDate } from "@/utils/helpers";

function BirthdayList({ list }) {
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
            {sortByDate(list).map((birthday) => {
              let month = parseInt(birthday.date[5] + birthday.date[6]);
              let day = birthday.date[8] + birthday.date[9];
              return (
                <div key={birthday._id} className={styles.row}>
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
