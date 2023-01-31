import React from "react";
import styles from "../styles/Clock.module.css";
import { useState, useEffect } from "react";
import { showRemaining, name } from "../utils/getDate";

import Unit from "./Unit";

export default function Clock() {
  const [time, setTime] = useState(["0" + 0, "0" + 0, "0" + 0, "0" + 0]);

  useEffect(() => {
    setTimeout(() => {
      setTime(showRemaining);
    }, 1000);
  }, [time]);

  return (
    <div className={styles.Clock}>
      <h1 className={styles.name}>It&apos;s {name}&apos;s birthday soon</h1>
      <div className={styles.timer}>
        <Unit unit="day" unitValue={time[0]} />
        <Unit unit="hour" unitValue={time[1]} />
        <Unit unit="minute" unitValue={time[2]} />
        <Unit unit="second" unitValue={time[3]} />
      </div>
    </div>
  );
}
