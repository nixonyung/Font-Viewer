import useEventListener from "@use-it/event-listener";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import availableTags from "../app/availableTags";
import { importFonts, reloadFonts, resetFonts } from "../app/fontsSlice";
import getFontTag from "../utils/getFontTag";

export default function Options() {
  return (
    <div className="flex flex-col gap-4 my-4">
      <Import />
      <Export />
      <ResetFonts />
      <ReloadFonts />
      <Anchors />
    </div>
  );
}

function Import() {
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

function Export() {
  const fonts = useSelector((store) => store.fonts);
  const [isShowingExportFontRecords, setIsShowingExportFontRecords] = useState(false);

  const fontsWithTags = fonts.reduce(
    (prev, fontName) => ({
      ...prev,
      [fontName]: getFontTag(fontName),
    }),
    {}
  );

  return (
    <div>
      <BlueButton
        onClick={() => setIsShowingExportFontRecords(!isShowingExportFontRecords)}
      >
        Toggle Export
      </BlueButton>

      {isShowingExportFontRecords && (
        <p className="ml-4">{JSON.stringify(fontsWithTags)}</p>
      )}
    </div>
  );
}

function ResetFonts() {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);

  useEventListener("keydown", ({ key }) => {
    if (key === "Shift") setDisabled(false);
  });
  useEventListener("keyup", ({ key }) => {
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

function ReloadFonts() {
  const dispatch = useDispatch();

  return (
    <div>
      <BlueButton
        onClick={() => {
          dispatch(reloadFonts());
        }}
      >
        Reload
      </BlueButton>
    </div>
  );
}

function Anchors() {
  return (
    <div className="flex items-center gap-4">
      <span>Go to: </span>
      {availableTags.map((tag) => (
        <a href={`#${tag}`} className="w-max">
          <BlueButton>{tag}</BlueButton>
        </a>
      ))}
    </div>
  );
}

function BlueButton({ children, ...props }) {
  return (
    <button
      className="rounded-xl disabled:cursor-auto px-3 py-2 text-white bg-blue-900 cursor-pointer"
      {...props}
    >
      {children}
    </button>
  );
}
