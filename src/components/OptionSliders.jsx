import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Slider } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFontSize,
  updateFontWeight,
  updateLetterSpacing,
} from "../app/displayTextOptionsSlice";

function OptionSlider({ value, label, updateFunction, ...sliderProps }) {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-1 mt-6">
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
      <div className="flex mx-2">
        <span className="flex-grow text-gray-400">{label}</span>
        <FontAwesomeIcon
          icon={faArrowsRotate}
          className="ml-3 cursor-pointer"
          onClick={() => dispatch(updateFunction({ type: "reset" }))}
        />
      </div>
    </div>
  );
}

export function FontWeightSlider() {
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

export function FontSizeSlider() {
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

export function LetterSpacingSlider() {
  const letterSpacing = useSelector((store) => store.displayTextOptions.letterSpacing);

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
