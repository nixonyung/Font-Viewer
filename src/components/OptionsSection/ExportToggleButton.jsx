import { useState } from "react";
import { useSelector } from "react-redux";
import getFontTag from "../../utils/getFontTag";
import BlueButton from "./BlueButton";

export default function ExportToggleButton() {
  const fonts = useSelector((store) => store.fonts);
  const [isShowingExportFontRecords, setIsShowingExportFontRecords] = useState(false);

  const fontsWithTags = fonts.reduce(
    (prev, fontName) => ({
      ...prev,
      [fontName]: getFontTag(fontName),
    }),
    {}
  );

  return (
    <div>
      <BlueButton
        onClick={() => setIsShowingExportFontRecords(!isShowingExportFontRecords)}
      >
        Toggle Export
      </BlueButton>

      {isShowingExportFontRecords && (
        <p className="ml-4">{JSON.stringify(fontsWithTags)}</p>
      )}
    </div>
  );
}
