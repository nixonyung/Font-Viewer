import { Radio, RadioGroup } from "@mantine/core";
import { useState } from "react";
import availableTags from "../../res/availableTags";
import getFontTag from "../../utils/getFontTag";

export default function Tags({ fontName }) {
  const [tag, setTag] = useState(getFontTag(fontName));

  const changeTag = (fontName, newTag) => {
    setTag(newTag);
    if (newTag === availableTags.slice(-1)[0]) localStorage.removeItem(fontName);
    else localStorage.setItem(fontName, newTag);
  };

  return (
    <RadioGroup
      value={tag}
      defaultValue={availableTags.slice(-1)[0]}
      onChange={(e) => {
        changeTag(fontName, e);
      }}
      spacing="xs"
      classNames={{
        label: "text-gray-200 cursor-pointer",
        radio: "cursor-pointer bg-black",
      }}
    >
      {availableTags.map((availableTag) => (
        <Radio key={availableTag} value={availableTag} label={availableTag} />
      ))}
    </RadioGroup>
  );
}
