import LoginModal from "../components/LoginModal";
import { useUser } from "../context/user";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const MenuBar = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const { user, logout, isLoading } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (router.query.login) {
      setShowSignIn(true);
      console.log("true");
    }
  }, [router]);

  return (
    <div className="flex justify-between mb-8 pb-4 border-b pr-3 border-gray-200">
      <Link href="/">
        <a>
          <h1 className="">Hjemmelunsj</h1>
        </a>
      </Link>

      <div className="flex items-center gap-4">
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
              <p className="">{`Hei, ${
                user.user_metadata.full_name || "du!"
              }`}</p>
              <Link href="/profile">
                <a className="button !bg-gray-200 hover:!bg-gray-300">
                  Min profil
                </a>
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
