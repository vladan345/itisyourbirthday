import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "../styles/AdminCheck.module.css";

function AdminCheck() {
  const { data: session } = useSession();

  const [name, setName] = useState("");
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);
  const [isValidMessage, setIsValidMessage] = useState("");

  const validation = () => {
    let months = [1, 3, 5, 7, 8, 10, 12];
    if (month < 1 || month > 12 || day < 1 || day > 31) {
      return "MONTH or DAY is invalid.";
    } else if (month == 2 && new Date().getFullYear() % 4 !== 0 && day > 28) {
      return "February only has 28 days this year (29 on leap years).";
    } else if (month == 2 && new Date().getFullYear() % 4 === 0 && day > 29) {
      return "It's leap year and February only has 29 days.";
    } else if (!months.includes(parseInt(month)) && day > 30) {
      return "Choosen month has only 30 days.";
    } else {
      return "";
    }
  };

  const saveBirthday = async () => {
    const isValid = validation();
    setIsValidMessage(isValid);

    if (isValid === "") {
      let res = await fetch("/api/birthday", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year: parseInt(new Date().getFullYear()),
          name: name,
          date: `${new Date().getFullYear()}-${
            month < 10 ? "0" + month.toString() : month.toString()
          }-${day < 10 ? "0" + day.toString() : day.toString()}T00:00:00`,
        }),
      });
      const newBirthday = await res.json();
      console.log("Create successful", { newBirthday });
    }
  };

  const handleInput = (e) => {
    let id = e.target.id;
    switch (id) {
      case "name":
        setName(e.target.value);
        break;
      case "month":
        setMonth(e.target.value);
        break;
      case "day":
        setDay(e.target.value);
        break;
    }
  };
  if (!session) {
    return (
      <div className={styles.wrap}>
        <h1 className={styles.heading}> You are not logged in</h1>
        <button className={styles.button} onClick={() => signIn()}>
          Sign in
        </button>
      </div>
    );
  } else if (session?.user.email === "vladanm087@gmail.com") {
    return (
      <div className={styles.wrap}>
        <h1 className={styles.heading}>Signed in as Admin</h1>
        <p className={styles.message}>{isValidMessage}</p>
        <form className={styles.form}>
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInput}
              value={name}
            />
            Name
          </label>
          <label htmlFor="month">
            <input
              type="number"
              name="month"
              id="month"
              min="1"
              max="12"
              onChange={handleInput}
              value={month}
            />
            Month
          </label>
          <label htmlFor="day">
            <input
              type="number"
              name="day"
              id="day"
              min="1"
              max="31"
              onChange={handleInput}
              value={day}
            />
            Day
          </label>
        </form>
        <button className={styles.button} onClick={() => saveBirthday()}>
          Submit
        </button>
        <button className={styles.button} onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  } else {
    return (
      <div className={styles.wrap}>
        <h1 className={styles.heading}>You are not the admin</h1>
        <button className={styles.button} onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }
}

export default AdminCheck;
