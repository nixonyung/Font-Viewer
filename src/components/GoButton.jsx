export default function GoButton({ url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 mr-3 bg-gray-800 rounded-full"
    >
      Go
    </a>
  );
}
