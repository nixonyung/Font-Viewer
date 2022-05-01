import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { removeFont } from "../../app/fontsSlice";

export default function RemoveButton({ fontName }) {
  const dispatch = useDispatch();

  return (
    <FontAwesomeIcon
      icon={faXmark}
      className=" hover:text-white pr-1 text-gray-400 cursor-pointer"
      onClick={() => {
        dispatch(removeFont(fontName));
      }}
    />
  );
}
