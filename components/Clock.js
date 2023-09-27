import React from "react";
import styles from "../styles/Clock.module.css";
import { useState, useEffect } from "react";
import { showRemaining, getBirthday } from "../utils/getDate";
import { sortByDate } from "@/utils/helpers";

import Unit from "./Unit";

export default function Clock({ birthdays }) {
  const [time, setTime] = useState(["0" + 0, "0" + 0, "0" + 0, "0" + 0]);
  const [endObject, setEndObject] = useState(null);

  useEffect(() => {
    if (endObject == undefined) {
      setEndObject(getBirthday(sortByDate(birthdays)));
    } else {
      setTimeout(() => {
        setTime(showRemaining(endObject));
      }, 1000);
    }
  }, [time, birthdays, endObject]);

  return (
    <>
      {birthdays.length < 1 ? (
        <p>No birthdays for this account</p>
      ) : (
        <div className={styles.Clock}>
          <h1 className={styles.name}>
            It is {endObject?.name}&apos;s birthday soon
          </h1>
          <div className={styles.timer}>
            <Unit unit="day" unitValue={time[0]} />
            <Unit unit="hour" unitValue={time[1]} />
            <Unit unit="minute" unitValue={time[2]} />
            <Unit unit="second" unitValue={time[3]} />
          </div>
        </div>
      )}
    </>
  );
}
