import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { GetStaticPaths, GetStaticProps } from "next";
import { ComponentPropsWithoutRef } from "react";
import NextLink from "next/link";

export default function Home({ num }: { num: number }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <div className={`${styles.page}`}>
        <main className={styles.main}>
          <p>
            I am a site1 page located at <code>/tenant/[num].tsx</code> but
            served on <code>/basepath/[num]</code>
          </p>
          <p>current num: {num}</p>
          <NextLink
            href={`/basepath/${num - 1}`}
            style={{ border: "1px solid black", padding: "10px" }}
          >
            num--
          </NextLink>
          <NextLink
            href={`/basepath/${num + 1}`}
            style={{ border: "1px solid black", padding: "10px" }}
          >
            num++
          </NextLink>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<
  ComponentPropsWithoutRef<typeof Home>,
  { num: string }
> = async ({ params }) => {
  return {
    props: {
      num: parseInt(params?.num ?? "0"),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
