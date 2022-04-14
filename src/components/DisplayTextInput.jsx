import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDisplayText } from "../app/displayTextSlice";

export default function DisplayTextInput() {
  const displayText = useSelector((state) => state.displayText);
  const dispatch = useDispatch();
  const displayTextInputRef = useRef(null);
  return (
    <>
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
        className="mb-4"
        ref={displayTextInputRef}
        onClick={() => displayTextInputRef.current.select()}
      ></input>
    </>
  );
}
