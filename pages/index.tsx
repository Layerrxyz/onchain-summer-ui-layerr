import { ConnectWallet } from "../components/ConnectWallet";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import FileUpload from "../components/FileUpload";
import Heading from "../components/Heading";
import ThemeSwitcher from "../components/ThemeSwitcher";
import logo from "../assets/logo.png";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Onchain Library</title>
        <meta
          content="Onchain Library created by Layerr.xyz"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className="min-h-screen bg-bg-primary dark:bg-bg-primary-dark">
        <section className="max-w-[1600px] m-auto flex flex-col p-4 md:pt-8 px-8 lg:px-16 lg:pt-16">
          <div className="sm:flex justify-between mb-4">
            <ThemeSwitcher />
            <ConnectWallet />
          </div>
          <Heading />
          <FileUpload />
        </section>
        <footer className="bg-bg-primary dark:bg-bg-primary-dark flex justify-center items-center">
          <p className="text-primary dark:text-primary-dark">Onchain Library powered by </p>
          <a
            href="https://layerr.xyz"
            className="text-primary dark:text-primary-dark ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image width={80} src={logo} alt="layerr icon"></Image>
          </a>
        </footer>
      </main>
    </div>
  );
};

export default Home;
