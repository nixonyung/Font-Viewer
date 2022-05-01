import CardsSection from "./components/CardsSection";
import DisplayTextInput from "./components/DisplayTextInput";
import OptionsSection from "./components/OptionsSection";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <div className="w-5/6 px-12 py-8">
        <DisplayTextInput />
        <OptionsSection />
        <CardsSection />
      </div>

      <Sidebar />
    </>
  );
}

export default App;
