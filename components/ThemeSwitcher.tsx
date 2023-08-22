import Sun from "../assets/icon-light-mode.svg";
import Moon from "../assets/icon-dark-mode.svg";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ThemeSwitcher() {
    const [darkMode, setDarkMode] = useState(false);
    
  useEffect(() => {
    const initialTheme = window.localStorage.getItem('theme');
    if (initialTheme === 'dark') setDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      window.localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      window.localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="flex items-center mb-8 gap-2">
      <Image alt="moon icon" src={Moon} onClick={()=>{setDarkMode(true)}} className="moon" />
      <div className="bg-slider-grey w-14 h-6 rounded-xl flex items-center  transition-all ">
        <div
          onClick={()=>{setDarkMode(!darkMode)}}
          className="bg-white cursor-pointer rounded-full w-4 h-4 m-1 translate-x-8 dark:translate-x-0 transition-all"
        ></div>
      </div>
      <Image alt="sun icon" src={Sun} onClick={()=>{setDarkMode(false)}} className="sun" />
    </div>
  );
}
