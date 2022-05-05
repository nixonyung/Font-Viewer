import { useSelector } from "react-redux";
import { updateLetterSpacing } from "../../redux/displayTextOptionsSlice";
import SidebarSlider from "./SidebarSlider";

export default function LetterSpacingSlider() {
  const letterSpacing = useSelector((store) => store.displayTextOptions.letterSpacing);

  return (
    <SidebarSlider
      value={letterSpacing}
      label="letter-spacing"
      updateFunction={updateLetterSpacing}
      min={-5.0}
      max={10.0}
      step={0.1}
    />
  );
}
