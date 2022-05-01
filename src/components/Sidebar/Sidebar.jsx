import {
  FontSizeSlider,
  FontWeightSlider,
  LetterSpacingSlider,
} from "../SidebarSlider";
import { BoldButton, ItalicButton, UnderlineButton } from "../SidebarTextStyleButton";
import Anchors from "./Anchors";
import BackToTopButton from "./BackToTopButton";
import ReloadButton from "./ReloadButton";

export default function Sidebar() {
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
}
