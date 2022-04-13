import { useEffect, useState } from "react";
import DisplayTextInput from "../components/DisplayTextInput";
import FontCards from "../components/FontCards";

function App() {
  const [fonts, setFonts] = useState(null);

  useEffect(() => {
    fetch("/api/fonts")
      .then((res) => res.json())
      .then((json) => setFonts(json));
  }, []);

  return (
    <div className="w-5/6 max-w-screen-md mx-auto mt-8">
      <DisplayTextInput />
      <FontCards fonts={fonts} />
    </div>
  );
}

export default App;
