import GoButton from "../CardActionButton/GoButton";
import DisplayText from "./DisplayText";
import FontName from "./FontName";
import RemoveButton from "./RemoveButton";
import Tags from "./Tags";

export default function Card({ fontName, demoButton }) {
  return (
    <div className="px-3 py-2 bg-gray-600 rounded-md">
      <div className="flex items-center gap-4">
        <FontName fontName={fontName} />
        <Tags fontName={fontName} />
        <RemoveButton fontName={fontName} />
      </div>

      <DisplayText fontName={fontName} />

      <div className="flex items-end justify-end gap-3 mt-1">
        {demoButton}
        <GoButton fontName={fontName} />
      </div>
    </div>
  );
}
