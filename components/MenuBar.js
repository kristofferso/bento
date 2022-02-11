import LoginModal from "../components/LoginModal";
import { useUser } from "../context/user";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const MenuBar = ({ useDarkmode }) => {
  const [showSignIn, setShowSignIn] = useState(false);
  const { user, logout, isLoading } = useUser();
  const { darkmode, setDarkmode } = useDarkmode;

  const router = useRouter();

  useEffect(() => {
    if (router.query.login) {
      setShowSignIn(true);
    }
  }, [router]);

  return (
    <div className="flex justify-between items-center mb-6 p-4 pt-0 border-b-2 border-black dark:border-white gap-4">
      <Link href="/">
        <a>
          <h1 className="text-4xl dark:text-white hover:bg-teal-700 hover:text-white">
            Hjemmelunsj
          </h1>
        </a>
      </Link>

      <div className="flex items-center justify-end gap-x-4 gap-y-1 flex-wrap flex-grow">
        <button
          className="button-secondary"
          onClick={() => {
            setDarkmode(!darkmode);
          }}
        >
          {darkmode ? "☀️" : "🌖"}
        </button>
        {!user ? (
          <>
            <button
              onClick={() => {
                setShowSignIn(true);
              }}
            >
              Logg inn
            </button>
          </>
        ) : (
          !isLoading && (
            <>
              <Link href="/recipe/create">
                <a className="button button-secondary">Ny lunsj</a>
              </Link>
              <Link href="/profile">
                <a className="button button-secondary">Min profil</a>
              </Link>
              <button onClick={logout}>Logg ut</button>
            </>
          )
        )}
      </div>
      <LoginModal show={showSignIn} setShow={setShowSignIn} />
    </div>
  );
};

export default MenuBar;
