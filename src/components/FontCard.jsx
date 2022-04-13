import GoogleFontLoader from "react-google-font-loader";
import { useSelector } from "react-redux";
import AddTag from "./AddTag";
import GoButton from "./GoButton";
import Tag from "./Tag";

export default function FontDisplay({ font }) {
  const displayText = useSelector((state) => state.displayText);
  const url = `https://fonts.google.com/?query=${font.name.split(" ").join("+")}`;

  return (
    <div className="p-3 bg-gray-600 rounded-md">
      <GoogleFontLoader
        fonts={[
          {
            font: font.name,
            weights: [400],
          },
        ]}
      />

      <div className="flex items-center gap-4">
        <span className="text-base text-gray-700">{font.name}</span>
        {font.tags.map((tag) => (
          <Tag tagName={tag} key={tag} />
        ))}
        <AddTag></AddTag>
      </div>
      <div className="flex items-end gap-6 mt-3">
        <p style={{ fontFamily: font }} className="w-full text-2xl">
          {displayText}
        </p>
        <GoButton url={url}></GoButton>
      </div>
    </div>
  );
}
