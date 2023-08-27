import { ConnectWallet } from "../components/ConnectWallet";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import FileUpload from "../components/FileUpload";
import Heading from "../components/Heading";
import ThemeSwitcher from "../components/ThemeSwitcher";
import logo from "../assets/logo.png";
import Image from "next/image";
import githubLight from 'assets/github-mark.svg'
import githubDark from 'assets/github-mark-white.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <footer className="bg-bg-primary gap-2 dark:bg-bg-primary-dark flex flex-col justify-center items-center">
          <a target="_blank" rel="noreferrer" href="https://github.com/Layerrxyz/OnchainLibrary" className="text-primary dark:text-primary-dark flex gap-2 items-center">
            <Image src={githubLight} className="dark:hidden h-6 w-6" alt="github logo" width={20} height={20} />
            <Image src={githubDark} className="hidden dark:inline-block h-6 w-6" alt="github logo" width={15} height={15} />
            <p className="w-[200px] sm:w-auto text-starttext-primary dark:text-primary-dark">View public repository for contracts on GitHub</p>
            <FontAwesomeIcon icon={['fas', 'arrow-up-right-from-square']} />
          </a>

          <div className="flex items-center mb-4 ">
            <p className="text-primary dark:text-primary-dark">Onchain Library powered by </p>
            <a
              href="https://layerr.xyz"
              className="text-primary dark:text-primary-dark ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image width={80} src={logo} alt="layerr icon"></Image>
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;
