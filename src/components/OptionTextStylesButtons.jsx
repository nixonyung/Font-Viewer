import { faBold, faItalic, faUnderline } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import {
  updateBold,
  updateItalic,
  updateUnderline,
} from "../app/displayTextOptionsSlice";

function OptionTextStylesButton({ value, icon, updateFunction }) {
  const dispatch = useDispatch();

  return (
    <ActionIcon
      variant={value ? "filled" : "outline"}
      color="blue"
      size="lg"
      onClick={() => dispatch(updateFunction())}
    >
      <FontAwesomeIcon icon={icon} size="lg" />
    </ActionIcon>
  );
}

export function BoldButton() {
  const isBold = useSelector((store) => store.displayTextOptions.bold);

  return (
    <OptionTextStylesButton value={isBold} icon={faBold} updateFunction={updateBold} />
  );
}

export function ItalicButton() {
  const isItalic = useSelector((store) => store.displayTextOptions.italic);

  return (
    <OptionTextStylesButton
      value={isItalic}
      icon={faItalic}
      updateFunction={updateItalic}
    />
  );
}

export function UnderlineButton() {
  const isUnderline = useSelector((store) => store.displayTextOptions.underline);

  return (
    <OptionTextStylesButton
      value={isUnderline}
      icon={faUnderline}
      updateFunction={updateUnderline}
    />
  );
}
