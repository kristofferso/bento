import Head from "next/head";
import { useEffect, useState } from "react";
import MenuBar from "../MenuBar";

export default function Layout({ children }) {
  const [darkmode, setDarkmode] = useState();

  useEffect(() => {
    const dark = localStorage.getItem("darkmode");
    if (dark !== typeof undefined) {
      setDarkmode(JSON.parse(dark));
    }
  }, []);

  useEffect(() => {
    if (darkmode) {
      window.document.documentElement.classList.add("dark");
      localStorage.setItem("darkmode", "true");
    } else {
      window.document.documentElement.classList.remove("dark");
      localStorage.setItem("darkmode", "false");
    }
  }, [darkmode]);

  return (
    <>
      <Head>
        <title>Hjemmelunsj</title>
        <meta
          name="description"
          content="Gode lunsjer for deg på hjemmekontor"
        />
      </Head>
      <main
        className={`max-w-3xl mx-auto pb-12 flex flex-col dark:text-white
      `}
      >
        <MenuBar useDarkmode={{ darkmode, setDarkmode }} />
        <div className="py-24 md:py-0">{children}</div>
      </main>
    </>
  );
}
