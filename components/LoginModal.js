import { useState } from "react";
import { useUser } from "../context/user";
import Modal from "./elements/Modal";

const LoginModal = ({ show, setShow }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const { loginWithEmail, loginWithApple } = useUser();

  const handleSignIn = async (e) => {
    setError(null);
    setSuccess(null);
    e.preventDefault();
    if (email) {
      setLoading(true);
      const { error } = await loginWithEmail(email);
      setLoading(false);
      if (error) {
        setError("Det skjedde en feil! Prøv igjen om 1 minutt 😢");
      } else {
        setSuccess(
          "Sjekk e-posten din! Vi har sendt deg en magisk lenke du kan logge inn med 🎉"
        );
      }
    }
  };

  return (
    <>
      {show && (
        <Modal
          title="Logg inn eller registrer deg"
          handleCloseModal={() => {
            setShow(false);
          }}
        >
          <p className="my-2 text-sm">
            Du vil få en e-post med en lenke for å logge inn eller registrere
            deg.
          </p>
          <form
            onSubmit={handleSignIn}
            className="flex flex-col gap-4 max-w-sm"
          >
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm mb-1">
                E-post
              </label>
              <input
                required
                type="email"
                autoComplete="email"
                name="email"
                id=""
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`${loading && "bg-teal-300"}`}
            >
              {loading ? <p className="animate-bounce">•</p> : "Logg in"}
            </button>
            {!error && success && (
              <div className="bg-green-50 dark:bg-green-200 rounded-md px-4 py-2 text-green-800">
                {success}
              </div>
            )}
            {error && (
              <div className="bg-red-50 dark:bg-red-200 rounded-md px-4 py-2 text-red-800">
                {error}
              </div>
            )}
          </form>
          <hr className="my-2" />
          <p className="text-center">eller</p>
          <button
            className="bg-gray-700 text-white hover:bg-gray-800"
            onClick={() => {
              loginWithApple();
            }}
          >
             Logg inn med Apple
          </button>
        </Modal>
      )}
    </>
  );
};

export default LoginModal;
