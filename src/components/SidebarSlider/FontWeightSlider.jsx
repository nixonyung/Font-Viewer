import { useSelector } from "react-redux";
import { updateFontWeight } from "../../redux/displayTextOptionsSlice";
import SidebarSlider from "./SidebarSlider";

export default function FontWeightSlider() {
  const fontWeight = useSelector((store) => store.displayTextOptions.fontWeight);

  return (
    <SidebarSlider
      value={fontWeight}
      label="font-weight"
      updateFunction={updateFontWeight}
      min={100}
      max={900}
      step={100}
    />
  );
}
