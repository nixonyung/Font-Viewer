import { faArrowUpLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  return (
    <a href="#top">
      <button className="bottom-12 right-12 fixed w-12 h-12 bg-gray-300 rounded-full cursor-pointer">
        <FontAwesomeIcon icon={faArrowUpLong} />
      </button>
    </a>
  );
}

export default App;
