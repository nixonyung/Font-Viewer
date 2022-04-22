import useEventListener from "@use-it/event-listener";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import tw from "twin.macro";
import availableTags from "../app/availableTags";
import { importFonts, reloadFonts, resetFonts } from "../app/fontsSlice";

export default function Options() {
  return (
    <div className="flex flex-col gap-4 my-4">
      <Import />
      <Export />
      <ResetFonts />
      <ReloadFonts />
    </div>
  );
}

const ButtonStyl = tw.button`rounded-xl px-3 py-2 bg-blue-900`;

function Import() {
  const dispatch = useDispatch();
  const [isShowingImport, setIsShowingImport] = useState(false);

  return (
    <div className="flex">
      <ButtonStyl onClick={() => setIsShowingImport(!isShowingImport)}>
        Toggle Import
      </ButtonStyl>

      {isShowingImport && (
        <input
          className="flex-grow ml-4"
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
      [fontName]: localStorage.getItem(fontName) ?? availableTags.slice(-1)[0],
    }),
    {}
  );

  return (
    <div>
      <ButtonStyl
        onClick={() => setIsShowingExportFontRecords(!isShowingExportFontRecords)}
      >
        Toggle Export
      </ButtonStyl>

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
      <ButtonStyl
        onClick={() => {
          dispatch(resetFonts());
        }}
        disabled={disabled}
      >
        Use default fonts
      </ButtonStyl>
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
      <ButtonStyl
        onClick={() => {
          dispatch(reloadFonts());
        }}
      >
        Reload
      </ButtonStyl>
    </div>
  );
}
