import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "../styles/AdminCheck.module.css";

function AdminCheck() {
  const { data: session } = useSession();

  const [name, setName] = useState("");
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);

  const saveBirthday = async () => {
    // let res = await fetch("/api/birthday", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     year: "2023",
    //     name: "Natalija",
    //     date: "2023-03-29T00:00:00",
    //   }),
    // });
    // const newBirthday = await res.json();
    // console.log("Create successful", { newBirthday });
    console.log(name, month, day);
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
