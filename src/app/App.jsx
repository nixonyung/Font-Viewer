import {
  faArrowDownLong,
  faArrowUpLong,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stack } from "@mui/material";
import useEventListener from "@use-it/event-listener";
import { useState } from "react";
import { useDispatch } from "react-redux";
import DisplayTextInput from "../components/DisplayTextInput";
import FontCards from "../components/FontCards";
import Options from "../components/Options";
import { reloadFonts } from "./fontsSlice";

function App() {
  return (
    <>
      <div className="w-5/6 max-w-screen-lg mx-auto my-8">
        <DisplayTextInput />
        <Options />
        <FontCards />
      </div>

      <Stack gap={3} className="bottom-12 right-12 fixed">
        <BackToTopButton />
        <ReloadButton />
      </Stack>
    </>
  );

  function BackToTopButton() {
    const [isTop, setIsTop] = useState(true);
    useEventListener("scroll", () => {
      setIsTop(window.scrollY <= 100);
    });

    return (
      <>
        {isTop ? (
          <a href="#add-font">
            <button className="w-12 h-12 bg-gray-300 rounded-full cursor-pointer">
              <FontAwesomeIcon icon={faArrowDownLong} />
            </button>
          </a>
        ) : (
          <a href="#top">
            <button className="w-12 h-12 bg-gray-300 rounded-full cursor-pointer">
              <FontAwesomeIcon icon={faArrowUpLong} />
            </button>
          </a>
        )}
      </>
    );
  }

  function ReloadButton() {
    const dispatch = useDispatch();

    return (
      <button
        className="w-12 h-12 bg-gray-300 rounded-full cursor-pointer"
        onClick={() => dispatch(reloadFonts())}
      >
        <FontAwesomeIcon icon={faRefresh} />
      </button>
    );
  }
}

export default App;
