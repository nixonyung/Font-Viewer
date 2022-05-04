import { useSelector } from "react-redux";

export default function DisplayText({ fontName }) {
  const displayText = useSelector((store) => store.displayText);
  const { bold, italic, underline, fontWeight, letterSpacing } = useSelector(
    (store) => store.displayTextOptions
  );
  const fontSize = useSelector((store) => store.displayTextOptions.fontSize) + "rem";

  return (
    <p
      style={{
        fontFamily: `${fontName}, Alien Twits`,
        fontWeight: bold ? "bold" : fontWeight,
        fontStyle: italic ? "italic" : "",
        textDecoration: underline ? "underline" : "",
        fontSize,
        letterSpacing,
      }}
      className="mx-3 mt-6"
    >
      {displayText}
    </p>
  );
}
