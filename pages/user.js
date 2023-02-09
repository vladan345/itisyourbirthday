import { useSession, signIn, signOut } from "next-auth/react";

import styles from "../styles/users.module.css";

export default function User() {
  const { data: session } = useSession();

  // const saveBirthday = async () => {
  //   let res = await fetch("/api/birthday", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       year: "2023",
  //       name: "Natalija",
  //       date: "2023-03-29T00:00:00",
  //     }),
  //   });
  //   const newBirthday = await res.json();
  //   console.log("Create successful", { newBirthday });
  // };

  if (session?.user.email === "vladanm087@gmail.com") {
    // saveBirthday();
    return (
      <div className="App">
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <div className={styles.blob}></div>
      </div>
    );
  } else if (session?.user.email !== "vladanm087@gmail.com") {
    return (
      <div className="App">
        You are not the admin
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }
}

// export async function getServerSideProps() {
//   let res = await fetch("http://localhost:3000/api/get-users")
//     .then((res) => res.json())
//     .then((data) => {
//       return data;
//     });

//   let users = await res;
//   return {
//     props: { users },
//   };
// }
