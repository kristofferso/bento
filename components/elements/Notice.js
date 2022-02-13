import React from "react";

export default function Notice({ type = "default", children }) {
  const style = {
    bg: {
      default: "bg-gray-100 dark:bg-gray-700",
      info: "bg-blue-50 dark:bg-gray-700",
      error: "bg-red-50 dark:bg-red-200",
      success: "bg-green-50 dark:bg-green-200",
    },
    text: {
      default: "",
      info: "text-blue-700 dark:text-blue-200",
      error: "text-red-800",
      success: "text-green-800",
    },
  };
  return (
    <div
      className={`flex gap-4 rounded-sm justify-between items-center p-4 ${style.bg[type]} ${style.text[type]}`}
    >
      {children}
    </div>
  );
}
