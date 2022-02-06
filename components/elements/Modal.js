export default function Modal({ children, ...props }) {
  return (
    <div
      {...props}
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-25 cursor-pointer p-2"
    >
      <div
        className="bg-white p-8 w-96 flex flex-col gap-4 rounded-md cursor-auto"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
}
