import { useEffect } from "react";

export default function Modal({
  children,
  width = 430,
  setCloseModal = () => {},
  ...props
}) {
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setCloseModal && setCloseModal();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [setCloseModal]);

  return (
    <div
      {...props}
      onClick={setCloseModal}
      className="fixed top-0 left-0 w-full h-full flex bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-5 cursor-pointer p-2 z-10 overflow-y-scroll"
    >
      <div
        className="bg-white dark:bg-gray-900 p-8 max-w-xl m-auto flex flex-col gap-4 rounded-md cursor-auto"
        style={{ width }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
}
