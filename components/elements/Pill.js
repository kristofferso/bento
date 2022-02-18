export default function Pill({ children, color = "gray", size = "normal" }) {
  const styles = {
    border: {
      gray: "border border-gray-300 dark:border-gray-500",
      blue: "border-blue-500 dark:border-blue-500",
    },
    bg: {
      gray: "bg-gray-100 dark:bg-gray-700",
      blue: "bg-blue-100 dark:bg-blue-300",
    },
    size: { normal: "px-3 py-1 text-sm" },
  };
  return (
    <div
      className={`flex items-center gap-2 rounded-full ${styles.bg[color]} ${styles.border[color]} ${styles.size[size]}`}
    >
      {children}
    </div>
  );
}
