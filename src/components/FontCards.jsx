import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import GoogleFontLoader from "react-google-font-loader";
import { useSelector } from "react-redux";

export default function FontCards({ fonts }) {
  return (
    <div className="flex flex-col gap-4">
      {fonts?.fonts.map((font) => (
        <FontCard font={font} key={font.name} />
      ))}
      <AddFont />
    </div>
  );
}

function FontCard({ font }) {
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

function Tag({ tagName }) {
  return (
    <span className="px-2 py-1 text-xs border-2 border-gray-400 rounded-full">
      {tagName}
    </span>
  );
}

function AddTag() {
  const [isEditing, setIsEditing] = useState(false);
  const newTagRef = useRef(null);

  useEffect(() => {
    if (isEditing) newTagRef.current.select();
  }, [isEditing]);

  return (
    <div
      className="px-2 py-1 text-xs border-2 border-gray-400 rounded-full cursor-pointer"
      onClick={(e) => {
        setIsEditing(true);
      }}
    >
      {isEditing ? (
        <input
          ref={newTagRef}
          className="w-1 text-center bg-gray-600 outline-none"
          onBlur={(e) => {
            setIsEditing(false);
          }}
          onChange={(e) => {
            e.target.style.width = e.target.value.length + "ch";
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.log(e.target.value);
              setIsEditing(false);
            } else if (e.key === "Escape") {
              setIsEditing(false);
            }
          }}
        />
      ) : (
        <FontAwesomeIcon icon={faPlus} size="1x" style={{ color: "#00000080" }} />
      )}
    </div>
  );
}

function GoButton({ url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-xl px-4 py-2 mr-3 bg-gray-800"
    >
      Go
    </a>
  );
}

function AddFont() {
  const [isEditing, setIsEditing] = useState(false);
  const newFontRef = useRef(null);

  useEffect(() => {
    if (isEditing) newFontRef.current.select();
  }, [isEditing]);

  return (
    <div
      className="place-items-center rounded-3xl grid w-3/5 h-12 mx-auto bg-gray-200 border-4 border-gray-800 cursor-pointer"
      onClick={(e) => {
        setIsEditing(true);
      }}
    >
      {isEditing ? (
        <input
          ref={newFontRef}
          className="text-center bg-gray-200 outline-none"
          onBlur={(e) => {
            setIsEditing(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.log(e.target.value);
              setIsEditing(false);
            } else if (e.key === "Escape") {
              setIsEditing(false);
            }
          }}
        />
      ) : (
        <FontAwesomeIcon icon={faPlus} size="2x" style={{ color: "#00000080" }} />
      )}
    </div>
  );
}
