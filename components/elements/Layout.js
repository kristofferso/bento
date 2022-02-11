import Head from "next/head";
import { useState } from "react";
import MenuBar from "../MenuBar";

export default function Layout({ children }) {
  const [darkmode, setDarkmode] = useState(false);
  return (
    <div className={`h-full ${darkmode ? "dark bg-gray-900" : ""}`}>
      <Head>
        <title>Hjemmelunsj</title>
        <meta
          name="description"
          content="Gode lunsjer for deg på hjemmekontor"
        />
      </Head>
      <main className={`max-w-3xl mx-auto py-4 flex flex-col dark:text-white`}>
        <MenuBar useDarkmode={{ darkmode, setDarkmode }} />
        {children}
      </main>
    </div>
  );
}
