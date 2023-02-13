import Link from "next/link";
import Image from "next/image";

import AdminCheck from "@/components/AdminCheck";
import BirthdayList from "@/components/BirthdayList";
import styles from "../styles/admin.module.css";

export default function User({ birthdays }) {
  console.log(birthdays);
  return (
    <div className="App">
      <Link href="/" className={styles.backBtn}>
        <Image
          src="/arrow-left-solid.svg"
          alt="arrow icon back home"
          width={40}
          height={30}
        />
      </Link>
      <AdminCheck />
      <BirthdayList />
    </div>
  );
}

//Temporary
export async function getServerSideProps() {
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://itisyourbirthday.vercel.app";

  let res = await fetch(url + "/api/getBirthdays")
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  let birthdays = await res;
  return {
    props: { birthdays },
  };
}
