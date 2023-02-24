import styles from "../styles/Celebrate.module.css";
import Lottie from "lottie-react";
import confetti from "@/public/confetti.json";

function Celebrate({ name }) {
  return (
    <div className={styles.Celebrate}>
      <Lottie className={styles.lottie} animationData={confetti} loop={true} />
      <h1 className={styles.name}>It is {name}&apos;s birthday now</h1>
    </div>
  );
}

export default Celebrate;
