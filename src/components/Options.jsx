import {
  faArrowsRotate,
  faBold,
  faItalic,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Group, Slider, Space, Stack } from "@mantine/core";
import useEventListener from "@use-it/event-listener";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import availableTags from "../app/availableTags";
import {
  updateBold,
  updateFontSize,
  updateFontWeight,
  updateItalic,
  updateLetterSpacing,
  updateUnderline,
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
  const dispatch = useDispatch();

  return (
    <Group spacing="lg">
      <TextStylesButtonGroup />
      <FontWeightSlider />
      <FontSizeSlider />
      <LetterSpacingSlider />
    </Group>
  );

  function TextStylesButtonGroup() {
    return (
      <Group spacing={3}>
        <BoldButton />
        <ItalicButton />
        <UnderlineButton />
      </Group>
    );

    function TextStylesButton({ value, icon, updateFunction }) {
      return (
        <ActionIcon
          variant={value ? "filled" : "outline"}
          size="xl"
          onClick={() => dispatch(updateFunction())}
        >
          <FontAwesomeIcon icon={icon} size="2x" />
        </ActionIcon>
      );
    }

    function BoldButton() {
      const isBold = useSelector((store) => store.displayTextOptions.bold);

      return (
        <TextStylesButton value={isBold} icon={faBold} updateFunction={updateBold} />
      );
    }

    function ItalicButton() {
      const isItalic = useSelector((store) => store.displayTextOptions.italic);

      return (
        <TextStylesButton
          value={isItalic}
          icon={faItalic}
          updateFunction={updateItalic}
        />
      );
    }

    function UnderlineButton() {
      const isUnderline = useSelector((store) => store.displayTextOptions.underline);

      return (
        <TextStylesButton
          value={isUnderline}
          icon={faUnderline}
          updateFunction={updateUnderline}
        />
      );
    }
  }

  function OptionSlider({ value, label, updateFunction, ...sliderProps }) {
    return (
      <Stack spacing={2} align="center">
        <Space h="lg" />
        <Slider
          value={value}
          onChange={(v) => dispatch(updateFunction(v))}
          min={100}
          max={900}
          step={100}
          labelAlwaysOn
          className="w-48"
          {...sliderProps}
        />
        <span className="text-gray-400">
          {label}
          <FontAwesomeIcon
            icon={faArrowsRotate}
            className="absolute ml-3 cursor-pointer"
            onClick={() => dispatch(updateFunction({ type: "reset" }))}
          />
        </span>
      </Stack>
    );
  }

  function FontWeightSlider() {
    const fontWeight = useSelector((store) => store.displayTextOptions.fontWeight);

    return (
      <OptionSlider
        value={fontWeight}
        label="font-weight"
        updateFunction={updateFontWeight}
        min={100}
        max={900}
        step={100}
      />
    );
  }

  function FontSizeSlider() {
    const fontSize = useSelector((store) => store.displayTextOptions.fontSize);

    return (
      <OptionSlider
        value={fontSize}
        label="font-size"
        updateFunction={updateFontSize}
        min={0.1}
        max={5.0}
        step={0.1}
      />
    );
  }

  function LetterSpacingSlider() {
    const letterSpacing = useSelector(
      (store) => store.displayTextOptions.letterSpacing
    );

    return (
      <OptionSlider
        value={letterSpacing}
        label="letter-spacing"
        updateFunction={updateLetterSpacing}
        min={-5.0}
        max={10.0}
        step={0.1}
      />
    );
  }
}
