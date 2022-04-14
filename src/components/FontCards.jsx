import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import GoogleFontLoader from "react-google-font-loader";
import { useDispatch, useSelector } from "react-redux";
import { addFont, addTag, removeFont, removeTag } from "../app/fontsSlice";

export default function FontCards() {
  const fontRecords = useSelector((state) => state.fontRecords.records);

  return (
    <div className="flex flex-col gap-4">
      {fontRecords.map((fontRecord) => (
        <FontCard fontRecord={fontRecord} key={fontRecord.fontName} />
      ))}

      <AddFontButton />
    </div>
  );
}

function FontCard({ fontRecord }) {
  const { fontName, tags } = fontRecord;
  const displayText = useSelector((state) => state.displayText);
  const url = `https://fonts.google.com/?query=${fontName.split(" ").join("+")}`;

  return (
    <div className="p-3 bg-gray-600 rounded-md">
      <div className="flex items-center gap-4">
        <span className="text-base text-gray-700">{fontName}</span>

        {tags.map((tag) => (
          <Tag {...{ fontName, tag }} key={fontName + "_" + tag} />
        ))}

        <AddTagButton fontName={fontName}></AddTagButton>
        <span className="flex-grow"></span>

        <RemoveCard fontName={fontName} />
      </div>
      <div className="flex items-end gap-6 mt-3">
        <GoogleFontLoader fonts={[{ font: fontRecord.fontName, weights: [400] }]} />
        <p style={{ fontFamily: fontName }} className="w-full text-2xl">
          {displayText}
        </p>

        <GoButton url={url}></GoButton>
      </div>
    </div>
  );
}

function RemoveCard({ fontName }) {
  const dispatch = useDispatch();

  return (
    <FontAwesomeIcon
      icon={faXmark}
      className=" pb-3 pr-1 cursor-pointer"
      style={{ color: "#00000080" }}
      onClick={() => {
        dispatch(removeFont(fontName));
      }}
    />
  );
}

function Tag({ fontName, tag }) {
  const [isShowingRemove, setIsShowingRemove] = useState(false);
  const width = tag.length + 3 + "ch";
  const dispatch = useDispatch();

  return (
    <span
      className="px-2 py-1 text-xs text-center border-2 border-gray-400 rounded-full cursor-pointer"
      style={{ width }}
      onMouseEnter={() => setIsShowingRemove(true)}
      onMouseLeave={() => setIsShowingRemove(false)}
      onClick={() => {
        dispatch(removeTag({ fontName, tag }));
      }}
    >
      {isShowingRemove ? <FontAwesomeIcon icon={faXmark} /> : tag}
    </span>
  );
}

function AddTagButton({ fontName }) {
  const [isEditing, setIsEditing] = useState(false);
  const newTagRef = useRef(null);
  const dispatch = useDispatch();

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
              dispatch(addTag({ fontName, tag: e.target.value }));
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

function AddFontButton() {
  const [isEditing, setIsEditing] = useState(false);
  const newFontRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditing) newFontRef.current.select();
  }, [isEditing]);

  return (
    <div
      className="place-items-center rounded-3xl grid w-2/5 h-16 mx-auto bg-gray-200 border-4 border-gray-200 cursor-pointer"
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
              dispatch(addFont(e.target.value));
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
