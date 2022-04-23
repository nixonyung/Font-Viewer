import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDisplayText } from "../app/displayTextSlice";

export default function DisplayTextInput() {
  const displayText = useSelector((store) => store.displayText);
  const dispatch = useDispatch();
  const displayTextInputRef = useRef(null);

  return (
    <div className="my-4">
      <label
        className="gap-0 mr-2"
        onClick={() => displayTextInputRef.current.select()}
      >
        Display Text:
      </label>

      <input
        className="w-full mb-4 text-white bg-gray-600"
        ref={displayTextInputRef}
        value={displayText}
        onClick={() => displayTextInputRef.current.select()}
        onChange={(event) => {
          dispatch(updateDisplayText(event.target.value));
        }}
      ></input>
    </div>
  );
}
