import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

export default function Modal({
  children,
  title = "",
  width = 430,
  handleCloseModal = () => {},
  ...props
}) {
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        handleCloseModal && handleCloseModal();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [handleCloseModal]);

  return (
    <div
      {...props}
      onClick={handleCloseModal}
      className="fixed top-0 left-0 w-full h-full flex bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-5 cursor-pointer p-2 z-30 overflow-y-scroll"
    >
      <div
        className="bg-white dark:bg-gray-900 p-8 max-w-xl m-auto flex flex-col gap-4 rounded-md cursor-auto"
        style={{ width }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="">{title}</h2>
          <button className="button-secondary" onClick={handleCloseModal}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
