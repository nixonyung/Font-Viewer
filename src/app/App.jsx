import DisplayTextInput from "../components/DisplayTextInput";
import FontCards from "../components/FontCards";
import Options from "../components/Options";

function App() {
  return (
    <div className="w-5/6 max-w-screen-md mx-auto my-8">
      <DisplayTextInput />
      <Options />
      <FontCards />
    </div>
  );
}

export default App;
