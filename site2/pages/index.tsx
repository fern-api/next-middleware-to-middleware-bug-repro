import Head from "next/head";
import styles from "@/styles/Home.module.css";
import NextLink from "next/link";
export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <div className={`${styles.page}`}>
        <main className={styles.main}>
          <p>I am a site2 page. /testing/[num] is rewritten to site1:</p>
          <NextLink
            href={`/testing/0`}
            style={{ border: "1px solid black", padding: "10px" }}
          >
            Click here to go to /testing/0
          </NextLink>
        </main>
      </div>
    </>
  );
}