import CardActionButton from "./CardActionButton";

export default function GoButton({ fontName }) {
  const url = `https://fonts.google.com/?query=${fontName.split(" ").join("+")}`;

  return (
    <CardActionButton>
      <a href={url} target="_blank" rel="noopener noreferrer">
        Go
      </a>
    </CardActionButton>
  );
}
