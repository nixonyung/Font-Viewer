import { faBold } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { updateBold } from "../../app/displayTextOptionsSlice";
import SidebarTextStyleButton from "./SidebarTextStyleButton";

export default function BoldButton() {
  const isBold = useSelector((store) => store.displayTextOptions.bold);

  return (
    <SidebarTextStyleButton value={isBold} icon={faBold} updateFunction={updateBold} />
  );
}
