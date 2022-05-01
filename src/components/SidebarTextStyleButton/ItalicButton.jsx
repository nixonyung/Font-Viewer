import { faItalic } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { updateItalic } from "../../app/displayTextOptionsSlice";
import SidebarTextStyleButton from "./SidebarTextStyleButton";

export default function ItalicButton() {
  const isItalic = useSelector((store) => store.displayTextOptions.italic);

  return (
    <SidebarTextStyleButton
      value={isItalic}
      icon={faItalic}
      updateFunction={updateItalic}
    />
  );
}
