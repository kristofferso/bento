import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ToggleTag({
  selected = false,
  size = "normal",
  label,
  ...props
}) {
  const styles = {
    default:
      "bg-gray-100 border-gray-400 dark:bg-gray-700 dark:border-gray-500",
    selected:
      "bg-blue-200 border-blue-500 dark:bg-blue-600 dark:border-blue-400 hover:bg-blue-300 dark:hover:bg-blue-500",
  };
  return (
    <button
      className={`flex items-center rounded-md border py-1 cursor-pointer px-3 font-sans text-black dark:text-white font-normal text-base hover:bg-gray-300 dark:hover:bg-gray-600
      } ${selected ? styles.selected : styles.default}`}
      {...props}
    >
      {label}
    </button>
  );
}
