import ContentEditable from "react-contenteditable";
import focusTextContent from "../utils/focusTextContent";

export default function AddTag() {
  return (
    <ContentEditable
      className="px-2 py-1 text-xs border-2 border-gray-400 rounded-full"
      tagName="span"
      html={"+"}
      onBlur={(e) => {
        console.log(e.target.textContent);
      }}
      onClick={(e) => {
        focusTextContent(e.target);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.target.blur();
      }}
    />
  );
}
