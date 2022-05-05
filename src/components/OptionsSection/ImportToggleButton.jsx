import { useState } from "react";
import { useDispatch } from "react-redux";
import { importFonts } from "../../redux/fontsSlice";
import BlueButton from "./BlueButton";

export default function ImportToggleButton() {
  const dispatch = useDispatch();
  const [isShowingImport, setIsShowingImport] = useState(false);

  return (
    <div className="flex">
      <BlueButton onClick={() => setIsShowingImport(!isShowingImport)}>
        Toggle Import
      </BlueButton>

      {isShowingImport && (
        <input
          className="flex-grow ml-4 bg-gray-600"
          onKeyDown={(e) => {
            if (e.key === "Enter") dispatch(importFonts(e.target.value));
          }}
        ></input>
      )}
    </div>
  );
}
