export default function GoButton({ fontName }) {
  const url = `https://fonts.google.com/?query=${fontName.split(" ").join("+")}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-xl px-4 py-2 mr-3 text-white no-underline bg-gray-800"
    >
      Go
    </a>
  );
}
