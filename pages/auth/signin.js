import Head from "next/head";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });

    console.log(res);
  };
  return (
    <>
      <div className="App">
        <div className={styles.login}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email . . ."
              value={userInfo.email}
              onChange={(
                { target } // dohvatio event.target odmah
              ) => setUserInfo({ ...userInfo, email: target.value })}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password . . ."
              value={userInfo.password}
              onChange={(
                { target } // dohvatio event.target odmah
              ) => setUserInfo({ ...userInfo, password: target.value })}
            />
            <input type="submit" value="Login" />
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
}
