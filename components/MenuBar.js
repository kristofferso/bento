import LoginModal from "../components/LoginModal";
import { useUser } from "../context/user";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const MenuBar = ({ useDarkmode }) => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (router.query.login) {
      setShowSignIn(true);
    }

    setShowDropdown(false);
  }, [router]);

  return (
    <div className="flex justify-between items-center mb-6 p-4 border-b-2 border-black dark:border-white gap-4 w-full bg-white dark:bg-slate-900 fixed md:static z-20">
      <Link href="/">
        <a>
          <h1 className="text-4xl border-gray-500 dark:border-gray-400 dark:text-white hover:border-b-4 hover:-mb-1">
            Hjemmelunsj
          </h1>
        </a>
      </Link>
      <div className="hidden sm:flex items-center justify-end gap-x-4 gap-y-1 flex-wrap flex-grow">
        <Menu useDarkmode={useDarkmode} />
      </div>
      <div className="block sm:hidden">
        <button onClick={() => setShowDropdown(!showDropdown)}>
          <FontAwesomeIcon icon={faBars} />
        </button>

        {showDropdown && (
          <div
            className="fixed z-20 top-0 left-0 w-full h-full cursor-pointer"
            onClick={(e) => {
              setShowDropdown(false);
              e.stopPropagation();
            }}
          >
            <div
              className="flex flex-col items-end bg-white dark:bg-gray-800 p-4 pl-8 drop-shadow-xl gap-2 absolute top-16 right-4 cursor-default"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Menu useDarkmode={useDarkmode} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuBar;

const Menu = ({ useDarkmode }) => {
  const [showSignIn, setShowSignIn] = useState(false);
  const { user, logout, isLoading } = useUser();
  const { darkmode, setDarkmode } = useDarkmode;

  return (
    <>
      <button
        className="button-secondary"
        onClick={() => {
          setDarkmode(!darkmode);
        }}
      >
        {darkmode ? (
          <FontAwesomeIcon icon={faSun} className="text-yellow-400" />
        ) : (
          <FontAwesomeIcon icon={faMoon} className="text-purple-600" />
        )}
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
      <LoginModal show={showSignIn} setShow={setShowSignIn} />
    </>
  );
};
