import "../styles/globals.css";
import UserProvider from "../context/user";
import Layout from "../components/elements/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
