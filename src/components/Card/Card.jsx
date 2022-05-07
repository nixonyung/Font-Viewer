import getFontTag from "../../utils/getFontTag";
import GoButton from "../CardActionButton/GoButton";
import TagHeader from "../CardsSection/TagHeader";
import DisplayText from "./DisplayText";
import FontName from "./FontName";
import RemoveButton from "./RemoveButton";
import Tags from "./Tags";

export default function Card({ style, fontName, demoButton, withHeader }) {
  return (
    <>
      {withHeader && <TagHeader tag={getFontTag(fontName)} />}
      <div
        style={style}
        className="border-y-2 px-3 py-2 my-6 bg-gray-600 border-gray-800 border-solid rounded-md"
      >
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
    </>
  );
}
