import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { reloadFonts } from "../../redux/fontsSlice";

export default function ReloadButton() {
  const dispatch = useDispatch();

  return (
    <button
      className="w-12 h-12 bg-gray-400 rounded-full cursor-pointer"
      onClick={() => dispatch(reloadFonts())}
    >
      <FontAwesomeIcon icon={faRefresh} color="black" />
    </button>
  );
}
