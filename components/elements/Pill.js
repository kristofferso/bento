export default function Pill({ children, color = "gray", size = "normal" }) {
  const styles = {
    border: { gray: "border border-gray-300 dark:border-gray-500" },
    bg: { gray: "bg-gray-100 dark:bg-gray-700" },
    size: { normal: "px-3 py-1 text-sm" },
  };
  return (
    <div
      className={`flex gap-2 rounded-full ${styles.bg[color]} ${styles.border[color]} ${styles.size[size]}`}
    >
      {children}
    </div>
  );
}
