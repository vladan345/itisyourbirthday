import { useState } from "react";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut, getSession } from "next-auth/react";
import Celebrate from "@/components/Celebrate";
import Clock from "@/components/Clock";
import Footer from "@/components/Footer";
import BirthdayList from "@/components/BirthdayList";
import prisma from "@/lib/prisma";

import styles from "@/styles/Home.module.css";

import { checkCelebrate } from "@/utils/helpers";

function Countdown({ birthdayList }) {
  const { data: session } = useSession();
  const [name, setName] = useState(checkCelebrate(birthdayList));

  return (
    <>
      <Head>
        <title>Countdown</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="App">
        <h1 className={styles.userName}>
          Welcome back, <span>{session?.session.user.name}</span>
        </h1>

        {name !== "" ? (
          <Celebrate name={name} />
        ) : (
          <Clock birthdays={birthdayList} />
        )}
        <button
          className="userLink"
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
        <Footer />
        <BirthdayList list={birthdayList} />
      </div>
    </>
  );
}

export default Countdown;

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
    props: { birthdayList },
  };
};
