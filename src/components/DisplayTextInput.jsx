import { useRef } from "react";
import { useDispatch } from "react-redux";
import { updateDisplayText } from "../app/slice";

export default function DisplayTextInput() {
  const dispatch = useDispatch();
  const displayTextInputRef = useRef(null);
  return (
    <>
      <label
        htmlFor="displayTextInput"
        className="gap-0 mr-2"
        onClick={() => displayTextInputRef.current.select()}
      >
        Demo sentence:
      </label>
      <input
        id="displayTextInput"
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
