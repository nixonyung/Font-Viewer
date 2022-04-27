import { faArrowDownLong, faArrowUpLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useEventListener from "@use-it/event-listener";
import { useState } from "react";
import DisplayTextInput from "../components/DisplayTextInput";
import FontCards from "../components/FontCards";
import Options from "../components/Options";

function App() {
  return (
    <>
      <div className="w-5/6 max-w-screen-lg mx-auto my-8">
        <DisplayTextInput />
        <Options />
        <FontCards />
      </div>

      <BackToTop />
    </>
  );
}

function BackToTop() {
  const [isTop, setIsTop] = useState(true);
  useEventListener("scroll", () => {
    setIsTop(window.scrollY <= 100);
  });

  return (
    <>
      {isTop ? (
        <a href="#add-font">
          <button className="bottom-12 right-12 fixed w-12 h-12 bg-gray-300 rounded-full cursor-pointer">
            <FontAwesomeIcon icon={faArrowDownLong} />
          </button>
        </a>
      ) : (
        <a href="#top">
          <button className="bottom-12 right-12 fixed w-12 h-12 bg-gray-300 rounded-full cursor-pointer">
            <FontAwesomeIcon icon={faArrowUpLong} />
          </button>
        </a>
      )}
    </>
  );
}

export default App;
