import DisplayTextInput from "../components/DisplayTextInput";
import FontCards from "../components/FontCards";
import Options from "../components/Options";
import OptionsMenu from "../components/OptionsMenu";

function App() {
  return (
    <>
      <div className="w-5/6 px-12 py-8">
        <DisplayTextInput />
        <Options />
        <FontCards />
      </div>

      <OptionsMenu />
    </>
  );
}

export default App;
