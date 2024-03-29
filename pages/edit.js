import { useEffect, useState } from "react";
import { useSession, getSession, signOut } from "next-auth/react";
import { sortByDate } from "@/utils/helpers";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import BirthdayList from "@/components/BirthdayList";
import Footer from "@/components/Footer";

import styles from "@/styles/Edit.module.css";

import prisma from "@/lib/prisma";

function Edit({ birthdayList, userId }) {
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
  const monthDays = {
    thirtyOne: ["Jan", "Mar", "May", "Jul", "Aug", "Oct", "Dec"],
    thirty: ["Apr", "Jun", "Sep", "Nov"],
  };

  const { data: session } = useSession();

  // const [userId, setUserId] = useState("");
  const [input, setInput] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const [days, setDays] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ]);

  const [selectedDay, setSelectedDay] = useState("01");
  const [selectedMonth, setSelectedMonth] = useState("01");

  const [selectedBirthday, setSelectedBirthday] = useState("");
  // const [selectedBirthdayData, setSelectedBirthdayData] = useState({});

  const [createBirthday, setCreateBirthday] = useState({
    userId: userId,
    date: "2023-01-01T00:00:00",
    name: "",
  });

  // useEffect(() => {
  //   session ? setUserId(session.token.sub) : null;
  // }, [session, userId, input, createBirthday]);

  // const handleEdit = () => {
  //   if (birthdayList && selectedBirthday) {
  //     setUpdateOpen(!updateOpen);
  //     const filtered = birthdayList.filter(
  //       (birthday) => birthday.id == selectedBirthday
  //     );
  //     setSelectedBirthdayData(filtered[0]);
  //   } else {
  //     alert("Please select one birthday to edit");
  //   }
  // };

  // const handleChange = async () => {
  //   const res = await fetch("/api/birthday/update", {
  //     method: "POST",
  //     body: JSON.stringify({ id: "clm3cfm1m0006v840zia9d5kp", input }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // };

  const handleDate = ({ target }) => {
    let year = new Date().getFullYear();

    if (target.name == "month") {
      // change number of days in dropdown
      let monthSelected = target.value;
      let monthNum = months.indexOf(monthSelected) + 1;
      let tempArr = [];

      if (monthDays.thirtyOne.indexOf(monthSelected) != -1) {
        for (let i = 1; i < 31 + 1; i++) {
          tempArr.push(i);
        }
      } else if (monthDays.thirty.indexOf(monthSelected) != -1) {
        console.log("something");
        for (let i = 1; i < 30 + 1; i++) {
          tempArr.push(i);
        }
      } else {
        for (let i = 1; i < 29 + 1; i++) {
          tempArr.push(i);
        }
      }
      setDays(tempArr);

      // Set month number
      if (monthNum < 10) {
        setSelectedMonth(`0${monthNum}`);
        setCreateBirthday({
          ...createBirthday,
          userId: userId,
          date: `${year}-0${monthNum}-${selectedDay}T00:00:00`,
        });
      } else {
        setSelectedMonth(`${monthNum}`);
        setCreateBirthday({
          ...createBirthday,
          userId: userId,
          date: `${year}-0${monthNum}-${selectedDay}T00:00:00`,
        });
      }
    } else {
      let daySelected = target.value;
      if (daySelected < 10) {
        setSelectedDay(`0${daySelected}`);
        setCreateBirthday({
          ...createBirthday,
          userId: userId,
          date: `${year}-${selectedMonth}-0${daySelected}T00:00:00`,
        });
      } else {
        setSelectedDay(`${daySelected}`);
        setCreateBirthday({
          ...createBirthday,
          userId: userId,
          date: `${year}-${selectedMonth}-${daySelected}T00:00:00`,
        });
      }
    }
  };

  const handleSubmitCreate = async () => {
    if (createBirthday.name != "" && createBirthday.userId != "") {
      const res = await fetch("/api/birthday/create", {
        method: "POST",
        body: JSON.stringify(createBirthday),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
      window.location.reload();
    }
  };

  const handleDelete = async () => {
    if (selectedBirthday) {
      const res = await fetch("/api/birthday/delete", {
        method: "POST",
        body: JSON.stringify(selectedBirthday),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
      window.location.reload();
    } else {
      alert("Please select one birthday to delete");
    }
  };

  return (
    <>
      <Head>
        <title>Edit</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="App Edit">
        <h1 className={styles.userName}>
          Welcome back, <span>{session?.session.user.name}</span>
        </h1>
        {/* <input
          type="text"
          value={input}
          onChange={({ target }) => setInput(target.value)}
        />
        <button onClick={handleChange}>Edit Vladan to something</button> */}

        {addOpen && (
          <div className={styles.createForm}>
            <span className={styles.formHeading}>Add new birthday</span>
            <div className={styles.formRow}>
              <input
                className={styles.name}
                type="text"
                value={createBirthday.name}
                onChange={({ target }) =>
                  setCreateBirthday({ ...createBirthday, name: target.value })
                }
              />
              <select
                name="month"
                className={styles.dropdown}
                onChange={handleDate}
              >
                {months &&
                  months.map((month) => {
                    return (
                      <option value={month} key={month}>
                        {month}
                      </option>
                    );
                  })}
              </select>
              <select
                name="day"
                className={styles.dropdown}
                onChange={handleDate}
              >
                {days != [] &&
                  days.map((day) => {
                    return (
                      <option value={day} key={day}>
                        {day}
                      </option>
                    );
                  })}
              </select>

              <button className={styles.addButton} onClick={handleSubmitCreate}>
                Submit
              </button>
            </div>
            <button
              className={styles.addButton}
              onClick={() => setAddOpen(false)}
            >
              <Image
                src="/xmark-solid.svg"
                alt="close button"
                width={25}
                height={25}
              />
            </button>
          </div>
        )}

        {/* {updateOpen && selectedBirthdayData ? (
          <div className={styles.createForm}>
            <span className={styles.formHeading}>Edit birthday</span>
            <div className={styles.formRow}>
              <input
                className={styles.name}
                type="text"
                value={selectedBirthdayData.name}
                placeholder={selectedBirthdayData.name}
                onChange={({ target }) =>
                  setSelectedBirthdayData({
                    ...selectedBirthdayData,
                    name: target.value,
                  })
                }
              />
              <select
                name="month"
                className={styles.dropdown}
                onChange={handleDate}
              >
                {months &&
                  months.map((month) => {
                    return (
                      <option value={month} key={month}>
                        {month}
                      </option>
                    );
                  })}
              </select>
              <select
                name="day"
                className={styles.dropdown}
                onChange={handleDate}
              >
                {days != [] &&
                  days.map((day) => {
                    return (
                      <option value={day} key={day}>
                        {day}
                      </option>
                    );
                  })}
              </select>

              <button className={styles.addButton} onClick={handleSubmitCreate}>
                Submit
              </button>
            </div>
            <button
              className={styles.addButton}
              onClick={() => setUpdateOpen(false)}
            >
              <Image
                src="/xmark-solid.svg"
                alt="close button"
                width={25}
                height={25}
              />
            </button>
          </div>
        ) : null} */}
        <div className={styles.list}>
          {birthdayList &&
            sortByDate(birthdayList).map((birthday) => {
              let month = parseInt(birthday.date[5] + birthday.date[6]);
              let day = birthday.date[8] + birthday.date[9];
              return (
                <div
                  key={birthday.id}
                  className={`${styles.row} ${
                    birthday.id == selectedBirthday ? styles.active : null
                  }`}
                  onClick={() => {
                    setSelectedBirthday(birthday.id);
                  }}
                >
                  <p className={styles.name}>{birthday.name}</p>
                  <div className={styles.menuDate}>
                    <p className={styles.menuMonth}>{months[month - 1]}</p>
                    <p className={styles.menuDay}>{day}</p>
                  </div>
                </div>
              );
            })}
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.addButton}
            onClick={() => setAddOpen(!addOpen)}
          >
            <Image
              src="/plus-solid.svg"
              alt="add button"
              width={25}
              height={25}
            />
          </button>
          {/* <button className={styles.addButton} onClick={handleEdit}>
            <Image
              src="/pen-solid.svg"
              alt="edit button"
              width={25}
              height={25}
            />
          </button> */}
          <button className={styles.addButton} onClick={handleDelete}>
            <Image
              src="/trash-solid.svg"
              alt="delete button"
              width={25}
              height={25}
            />
          </button>
        </div>
        <button
          className="headerLink"
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          <Image
            width={25}
            height={25}
            src="/power-off-solid.svg"
            alt="user icon"
          />
        </button>
        <Link className="headerLink editButton" href="/countdown">
          <Image
            width={25}
            height={25}
            src="/cake-candles-solid.svg"
            alt="celebrate icon"
          />
        </Link>
        {/* <Footer /> */}
        <BirthdayList list={birthdayList} />
      </div>
    </>
  );
}

export default Edit;

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      props: { birthdayList: [] },
    };
  }
  const userId = session.token.sub;
  const birthdayList = await prisma.birthday.findMany({
    where: {
      userId: userId,
    },
  });
  return {
    props: { birthdayList, userId },
  };
};
