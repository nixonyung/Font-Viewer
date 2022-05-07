import { useContext } from "react";
import GoogleFontLoader from "react-google-font-loader";
import { useSelector } from "react-redux";
import { Virtuoso } from "react-virtuoso";
import { CardSectionRefContext } from "../../contexts/CardSectionRefContext";
import availableTags from "../../res/availableTags";
import getFontTag from "../../utils/getFontTag";
import Card from "../Card";
import DemoButton from "../CardActionButton/DemoButton";
import AddFontButton from "./AddFontButton";
import DemoModal from "./DemoModal";

export default function CardsSection() {
  const CardSectionRef = useContext(CardSectionRefContext);
  const fonts = useSelector((store) => store.fonts);
  const groupCounts = availableTags.map((tag) =>
    fonts.reduce((prev, fontName) => prev + +(getFontTag(fontName) === tag), 0)
  );

  const cumulativeGroupCounts = [0];
  for (const count of groupCounts) {
    cumulativeGroupCounts.push(count + +cumulativeGroupCounts.slice(-1));
  }

  return (
    <>
      <GoogleFontLoader
        fonts={fonts.map((font) => ({
          font,
          weights: [...Array(9).keys()].map((v) => (v + 1) * 100),
        }))}
      />
      <DemoModal />

      <Virtuoso
        useWindowScroll
        ref={CardSectionRef}
        itemSize={(el, field) => {
          if (field === "offsetHeight") return el.getBoundingClientRect().height + 48;
          else return el.getBoundingClientRect().width;
        }}
        data={fonts}
        itemContent={(index) => (
          <Card
            fontName={fonts[index]}
            demoButton={<DemoButton fontIdx={index} />}
            withHeader={cumulativeGroupCounts.includes(index)}
          />
        )}
      />
      <AddFontButton />
    </>
  );
}
