import { faUnderline } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { updateUnderline } from "../../redux/displayTextOptionsSlice";
import SidebarTextStyleButton from "./SidebarTextStyleButton";

export default function UnderlineButton() {
  const isUnderline = useSelector((store) => store.displayTextOptions.underline);

  return (
    <SidebarTextStyleButton
      value={isUnderline}
      icon={faUnderline}
      updateFunction={updateUnderline}
    />
  );
}
