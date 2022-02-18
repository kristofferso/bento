export default function HorizontalLine({ className = "" }) {
  return (
    <div
      className={`border-b-2 border-black dark:border-white w-auto ${className}`}
    />
  );
}
