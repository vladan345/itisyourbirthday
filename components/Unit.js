import { useEffect } from "react";
import { updateDisplay } from "../utils/animation";

import styles from "../styles/Unit.module.css";

function Unit(props) {
  useEffect(() => {
    updateDisplay(props.unitValue, props.unit);
  }, [props.unitValue, props.unit, props]);

  return (
    <div className={styles.timerPart}>
      <div className={styles.outer} id={props.unit}>
        <div className="topFront">
          <span className={styles.number}>{props.unitValue}</span>
        </div>
        <div className="topBack">
          <span className={styles.number}>{props.unitValue}</span>
        </div>
        <div className="bottomFront">
          <span className={styles.number}>{props.unitValue}</span>
        </div>
        <div className="bottomBack">
          <span className={styles.number}>{props.unitValue}</span>
        </div>
      </div>
      <p className={styles.label}>{props.unit}s</p>
    </div>
  );
}

export default Unit;
