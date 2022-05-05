import { Fragment, useState } from "react";
import GoogleFontLoader from "react-google-font-loader";
import { useDispatch, useSelector } from "react-redux";
import { updateDemoFontIdx } from "../../redux/demoFontIdxSlice";
import { updateDemoModalOpened } from "../../redux/demoModalOpenedSlice";
import getFontTag from "../../utils/getFontTag";
import Card from "../Card";
import DemoButton from "../CardActionButton/DemoButton";
import AddFontButton from "./AddFontButton";
import DemoModal from "./DemoModal";
import TagHeader from "./TagHeader";

export default function CardsSection() {
  const fonts = useSelector((store) => store.fonts);
  const [isDemoOpened, setIsDemoOpened] = useState(false);
  const [demoFontIdx, setDemoFontIdx] = useState(0);
  const dispatch = useDispatch();
  let lastTag = "";

  return (
    <>
      <GoogleFontLoader
        fonts={fonts.map((font) => ({
          font,
          weights: [...Array(9).keys()].map((v) => (v + 1) * 100),
        }))}
      />

      <DemoModal {...{ isDemoOpened, setIsDemoOpened, demoFontIdx, setDemoFontIdx }} />

      <section className="flex flex-col gap-4">
        {fonts.map((fontName, i) => {
          const thisTag = getFontTag(fontName);
          const withHeader = thisTag !== lastTag;
          lastTag = thisTag;

          return (
            <Fragment key={fontName}>
              {withHeader && <TagHeader tag={thisTag} />}
              <Card
                fontName={fontName}
                demoButton={
                  <DemoButton
                    onClick={() => {
                      dispatch(updateDemoModalOpened(true));
                      dispatch(updateDemoFontIdx(i));
                    }}
                  />
                }
              />
            </Fragment>
          );
        })}
      </section>

      <AddFontButton />
    </>
  );
}
