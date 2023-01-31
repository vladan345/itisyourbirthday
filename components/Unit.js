import { useEffect } from "react";
import { updateDisplay } from "../utils/animation";

import styles from "../styles/Unit.module.css";

function Unit(props) {
  useEffect(() => {
    updateDisplay(props.unitValue, props.unit);
    console.log(props);
  }, [props.unitValue, props.unit]);

  return (
    <div className={styles.timerPart}>
      <div className={styles.outer} id={props.unit}>
        <div className={`${styles.topFront} topFront`}>
          <span className={styles.number}>{props.unitValue}</span>
        </div>
        <div className={`${styles.topBack} topBack`}>
          <span className={styles.number}>{props.unitValue}</span>
        </div>
        <div className={`${styles.bottomFront} bottomFront`}>
          <span className={styles.number}>{props.unitValue}</span>
        </div>
        <div className={`${styles.bottomBack} bottomBack`}>
          <span className={styles.number}>{props.unitValue}</span>
        </div>
      </div>
      <p className={styles.label}>{props.unit}s</p>
    </div>
  );
}

export default Unit;
