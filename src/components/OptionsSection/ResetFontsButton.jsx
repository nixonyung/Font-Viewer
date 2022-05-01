import { useWindowEvent } from "@mantine/hooks";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetFonts } from "../../app/fontsSlice";
import BlueButton from "./BlueButton";

export default function ResetFontsButton() {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);

  useWindowEvent("keydown", ({ key }) => {
    if (key === "Shift") setDisabled(false);
  });
  useWindowEvent("keyup", ({ key }) => {
    if (key === "Shift") setDisabled(true);
  });

  return (
    <div>
      <BlueButton
        onClick={() => {
          dispatch(resetFonts());
        }}
        disabled={disabled}
      >
        Use default fonts
      </BlueButton>
      <span className="ml-3 text-xs">
        (Hold Shift to enable the button, NO CONFIRMATION)
      </span>
    </div>
  );
}
