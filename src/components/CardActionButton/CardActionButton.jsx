export default function CardActionButton({ children, ...props }) {
  return (
    <button
      className="rounded-xl px-4 py-2 mr-3 text-white no-underline bg-gray-800"
      {...props}
    >
      {children}
    </button>
  );
}
