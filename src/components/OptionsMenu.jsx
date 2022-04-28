import {
  faArrowDownLong,
  faArrowUpLong,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useEventListener from "@use-it/event-listener";
import { useState } from "react";
import { useDispatch } from "react-redux";
import availableTags from "../app/availableTags";
import { reloadFonts } from "../app/fontsSlice";
import { FontSizeSlider, FontWeightSlider, LetterSpacingSlider } from "./OptionSliders";
import { BoldButton, ItalicButton, UnderlineButton } from "./OptionTextStylesButtons";

export default function OptionsMenu() {
  return (
    <div className="fixed top-0 right-0 flex flex-col items-center w-1/6 h-screen gap-6 bg-gray-800">
      <Anchors />

      <FontWeightSlider />
      <FontSizeSlider />
      <LetterSpacingSlider />

      <div className="flex gap-3">
        <BoldButton />
        <ItalicButton />
        <UnderlineButton />
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-6 p-6">
        <BackToTopButton />
        <ReloadButton />
      </div>
    </div>
  );

  function Anchors() {
    return (
      //   <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col w-full">
        {availableTags.map((tag) => (
          <a key={tag} href={`#${tag}`} className="hover:bg-gray-600 py-2 text-center">
            {tag}
          </a>
        ))}
      </div>
      //   </div>
    );
  }

  function BackToTopButton() {
    const [isTop, setIsTop] = useState(true);
    useEventListener("scroll", () => {
      setIsTop(window.scrollY <= 100);
    });

    return (
      <>
        {isTop ? (
          <a href="#add-font">
            <button className="w-12 h-12 bg-gray-400 rounded-full cursor-pointer">
              <FontAwesomeIcon icon={faArrowDownLong} color="black" />
            </button>
          </a>
        ) : (
          <a href="#top">
            <button className="w-12 h-12 bg-gray-400 rounded-full cursor-pointer">
              <FontAwesomeIcon icon={faArrowUpLong} color="black" />
            </button>
          </a>
        )}
      </>
    );
  }

  function ReloadButton() {
    const dispatch = useDispatch();

    return (
      <button
        className="w-12 h-12 bg-gray-400 rounded-full cursor-pointer"
        onClick={() => dispatch(reloadFonts())}
      >
        <FontAwesomeIcon icon={faRefresh} color="black" />
      </button>
    );
  }
}
