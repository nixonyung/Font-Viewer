import DisplayTextInput from "../components/DisplayTextInput";
import FontCards from "../components/FontCards";
import Options from "../components/Options";

function App() {
  return (
    <div className="w-5/6 max-w-screen-lg mx-auto my-8">
      <DisplayTextInput />
      <Options />
      <FontCards />
    </div>
  );
}

export default App;
