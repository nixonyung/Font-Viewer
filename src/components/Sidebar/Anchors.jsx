import { useContext } from "react";
import { useSelector } from "react-redux";
import { CardSectionRefContext } from "../../contexts/CardSectionRefContext";
import availableTags from "../../res/availableTags";
import getFontTag from "../../utils/getFontTag";

export default function Anchors() {
  const fonts = useSelector((store) => store.fonts);
  const groupCounts = availableTags.map((tag) =>
    fonts.reduce((prev, fontName) => prev + +(getFontTag(fontName) === tag), 0)
  );

  const cumulativeGroupCounts = [0];
  for (const count of groupCounts) {
    cumulativeGroupCounts.push(count + +cumulativeGroupCounts.slice(-1));
  }

  const CardSectionRef = useContext(CardSectionRefContext);

  return (
    <div className="flex flex-col w-full">
      {availableTags.map((tag, idx) => (
        <button
          key={tag}
          className="hover:bg-gray-600 py-2 text-center"
          onClick={() =>
            CardSectionRef.current.scrollToIndex({ index: cumulativeGroupCounts[idx] })
          }
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
