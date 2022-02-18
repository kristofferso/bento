import LoginModal from "./LoginModal";
import { useUser } from "../context/user";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import Logo from "./Logo";

const Nav = ({ useDarkmode }) => {
  const { darkmode, setDarkmode } = useDarkmode;
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    if (router.query.login) {
      setShowSignIn(true);
    }

    setShowDropdown(false);
  }, [router]);

  return (
    <div className="flex justify-between items-center mb-6 p-4 border-b-2 border-black dark:border-white gap-4 w-full bg-white dark:bg-slate-900 fixed md:static z-20">
      <Link href="/">
        <a className="flex gap-3 items-center group">
          <h1 className="text-3xl xs:text-4xl border-orange-300  dark:text-white group-hover:border-b-4 group-hover:-mb-1">
            Bento
          </h1>

          <Logo className="h-9 -mt-1" />
        </a>
      </Link>
      <div className="flex gap-4">
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
        <div className="hidden sm:flex items-center justify-end gap-x-3 gap-y-1 flex-wrap flex-grow">
          <Menu showSignIn={showSignIn} setShowSignIn={setShowSignIn} />
        </div>
        {/* Mobile menu */}
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
                className="flex flex-col items-end bg-white dark:bg-gray-800 p-4 pl-8 drop-shadow-xl gap-2 absolute top-16 right-4 cursor-default border-2 border-black rounded-sm dark:border-white"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Menu setShowSignIn={setShowSignIn} />
              </div>
            </div>
          )}
        </div>
      </div>
      <LoginModal show={showSignIn} setShow={setShowSignIn} />
    </div>
  );
};

export default Nav;

const Menu = ({ setShowSignIn }) => {
  const { user, logout, isLoading } = useUser();

  return (
    <>
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
            <Link href="/recipe/new">
              <a className="button button-secondary">Ny lunsj</a>
            </Link>
            <Link href="/profile">
              <a className="button button-secondary">Min profil</a>
            </Link>
            <button
              onClick={() => {
                logout("/logout");
              }}
            >
              Logg ut
            </button>
          </>
        )
      )}
    </>
  );
};
