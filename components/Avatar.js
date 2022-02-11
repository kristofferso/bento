import Image from "next/image";

export default function Avatar({ src, alt, size = "lg", ...props }) {
  const styles = {
    size: { lg: "w-32 h-32", md: "w-20 h-20", sm: "w-16 h-16" },
  };
  return (
    <div
      className={`rounded-full bg-slate-100 relative overflow-hidden ${styles.size[size]}`}
    >
      <Image src={src} alt={alt} layout="fill" />
    </div>
  );
}
