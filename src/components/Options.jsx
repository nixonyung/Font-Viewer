import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Slider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import useEventListener from "@use-it/event-listener";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import availableTags from "../app/availableTags";
import availableStyles from "../app/availableTextOptions";
import {
  updateFontSize,
  updateFontWeight,
  updateLetterSpacing,
  updateStyles,
} from "../app/displayTextOptionsSlice";
import { importFonts, resetFonts } from "../app/fontsSlice";
import getFontTag from "../utils/getFontTag";

export default function Options() {
  return (
    <div className="flex flex-col gap-4 my-4">
      <Import />
      <Export />
      <ResetFonts />
      <Anchors />
      <TextStyles />
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

function Anchors() {
  return (
    <div className="flex items-center gap-4">
      <span>Go to: </span>
      {availableTags.map((tag) => (
        <a key={tag} href={`#${tag}`} className="w-max">
          <BlueButton>{tag}</BlueButton>
        </a>
      ))}
    </div>
  );
}

function TextStyles() {
  const styles = useSelector((store) => store.displayTextOptions.styles);
  const dispatch = useDispatch();

  return (
    <Stack direction="row" spacing={4} alignItems="center">
      <TextStylesButtonGroup />
      <FontWeightSlider />
      <FontSizeSlider />
      <LetterSpacingSlider />
    </Stack>
  );

  function TextStylesButtonGroup() {
    return (
      <ToggleButtonGroup
        value={styles}
        onChange={(e, newStyles) => {
          dispatch(updateStyles(newStyles));
        }}
      >
        {availableStyles.map((style) => (
          <ToggleButton
            key={style}
            value={style}
            className={`capitalize py-1 text-white border-2 border-solid border-gray-800 ${
              styles.includes(style) && "bg-gray-600"
            }`}
          >
            {style}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    );
  }

  function FontWeightSlider() {
    const fontWeight = useSelector((store) => store.displayTextOptions.fontWeight);

    return (
      <Box>
        <Typography textAlign="center">
          font-weight: {fontWeight}
          <FontAwesomeIcon
            icon={faArrowsRotate}
            className="ml-3 cursor-pointer"
            onClick={() => dispatch(updateFontWeight({ type: "reset" }))}
          />
        </Typography>
        <Slider
          min={100}
          max={900}
          step={100}
          value={fontWeight}
          onChange={(e) => dispatch(updateFontWeight(e.target.value))}
          className="w-48"
        />
      </Box>
    );
  }

  function FontSizeSlider() {
    const fontSize = useSelector((store) => store.displayTextOptions.fontSize);

    return (
      <Box>
        <Typography textAlign="center">
          font-size: {fontSize}rem
          <FontAwesomeIcon
            icon={faArrowsRotate}
            className="ml-3 cursor-pointer"
            onClick={() => dispatch(updateFontSize({ type: "reset" }))}
          />
        </Typography>
        <Slider
          min={0.1}
          max={5.0}
          step={0.1}
          value={fontSize}
          onChange={(e) => dispatch(updateFontSize(e.target.value))}
          className="w-48"
        />
      </Box>
    );
  }

  function LetterSpacingSlider() {
    const letterSpacing = useSelector(
      (store) => store.displayTextOptions.letterSpacing
    );

    return (
      <Box>
        <Typography textAlign="center">
          letter-spacing: {letterSpacing}
          <FontAwesomeIcon
            icon={faArrowsRotate}
            className="ml-3 cursor-pointer"
            onClick={() => dispatch(updateLetterSpacing({ type: "reset" }))}
          />
        </Typography>
        <Slider
          min={-5.0}
          max={10.0}
          step={0.1}
          value={letterSpacing}
          onChange={(e) => dispatch(updateLetterSpacing(e.target.value))}
          className="w-48"
        />
      </Box>
    );
  }
}
