import DisplayText from "./DisplayText";
import FontName from "./FontName";
import GoButton from "./GoButton";
import RemoveButton from "./RemoveButton";
import Tags from "./Tags";

export default function Card({ fontName }) {
  return (
    <div className="px-3 py-2 bg-gray-600 rounded-md">
      <div className="flex items-center gap-4">
        <FontName fontName={fontName} />
        <Tags fontName={fontName} />
        <RemoveButton fontName={fontName} />
      </div>
      <div className="flex items-end gap-6 mt-3">
        <DisplayText fontName={fontName} />
        <GoButton fontName={fontName} />
      </div>
    </div>
  );
}
