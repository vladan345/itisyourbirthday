import { useState } from "react";
import styles from "../styles/BirthdayList.module.css";
import { birthdays } from "@/utils/getDate";
function BirthdayList() {
  const [opened, setOpened] = useState(false);

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

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
          <div className={styles.dataScroll}></div>
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
