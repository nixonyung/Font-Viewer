import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Slider } from "@mantine/core";
import { useDispatch } from "react-redux";

export default function SidebarSlider({
  value,
  label,
  updateFunction,
  ...sliderProps
}) {
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
