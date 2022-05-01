import { useSelector } from "react-redux";
import { updateFontSize } from "../../app/displayTextOptionsSlice";
import SidebarSlider from "./SidebarSlider";

export default function FontSizeSlider() {
  const fontSize = useSelector((store) => store.displayTextOptions.fontSize);

  return (
    <SidebarSlider
      value={fontSize}
      label="font-size"
      updateFunction={updateFontSize}
      min={0.1}
      max={5.0}
      step={0.1}
    />
  );
}
