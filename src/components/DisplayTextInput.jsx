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
        htmlFor="displayTextInput"
        className="gap-0 mr-2"
        onClick={() => displayTextInputRef.current.select()}
      >
        Display Text:
      </label>

      <input
        id="displayTextInput"
        value={displayText}
        onChange={(event) => {
          dispatch(updateDisplayText(event.target.value));
        }}
        className="w-full mb-4"
        ref={displayTextInputRef}
        onClick={() => displayTextInputRef.current.select()}
      ></input>
    </div>
  );
}
