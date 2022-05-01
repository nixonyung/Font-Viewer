import availableTags from "../../res/availableTags";

export default function Anchors() {
  return (
    <div className="flex flex-col w-full">
      {availableTags.map((tag) => (
        <a key={tag} href={`#${tag}`} className="hover:bg-gray-600 py-2 text-center">
          {tag}
        </a>
      ))}
    </div>
  );
}
