import Head from "next/head";
import MenuBar from "../MenuBar";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Hjemmelunsj</title>
        <meta
          name="description"
          content="Gode lunsjer for deg på hjemmekontor"
        />
      </Head>
      <main className="max-w-3xl mx-auto px-4 py-8 flex flex-col">
        <MenuBar />
        {children}
      </main>
    </div>
  );
}
