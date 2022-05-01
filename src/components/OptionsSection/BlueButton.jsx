export default function BlueButton({ children, ...props }) {
  return (
    <button
      className="rounded-xl disabled:cursor-auto px-3 py-2 text-white bg-blue-900 cursor-pointer"
      {...props}
    >
      {children}
    </button>
  );
}
