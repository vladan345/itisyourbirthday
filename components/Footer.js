import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.icons}>
        <i className={styles.facebook}></i>
        <i className={styles.linkedin}></i>
        <i className={styles.instagram}></i>
      </div>
      <div className={styles.attribution}>
        Challenge by
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by <a href="https://github.com/vladan345">Vladan345</a>.
      </div>
    </footer>
  );
}
