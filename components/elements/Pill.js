export default function Pill({ children, color = "gray", size = "normal" }) {
  const styles = {
    border: { gray: "border border-gray-300" },
    bg: { gray: "bg-gray-100" },
    size: { normal: "px-3 py-1 text-sm" },
  };
  return (
    <p
      className={`rounded-full ${styles.bg[color]} ${styles.border[color]} ${styles.size[size]}`}
    >
      {children}
    </p>
  );
}
