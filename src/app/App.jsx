import { useEffect, useState } from "react";
import DisplayTextInput from "../components/DisplayTextInput";
import FontCard from "../components/FontCard";

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

      <div className="flex flex-col gap-4">
        {fonts?.fonts.map((font) => (
          <FontCard font={font} key={font.name} />
        ))}
      </div>
    </div>
  );
}

export default App;
