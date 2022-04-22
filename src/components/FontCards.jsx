import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import GoogleFontLoader from "react-google-font-loader";
import { useDispatch, useSelector } from "react-redux";
import tw from "twin.macro";
import availableTags from "../app/availableTags";
import { addFont, removeFont } from "../app/fontsSlice";

const SpacerStyl = tw.span`flex-grow`;

export default function FontCards() {
  const fonts = useSelector((store) => store.fonts);

  return (
    <>
      <GoogleFontLoader fonts={fonts.map((font) => ({ font, weights: [400] }))} />

      <div className="flex flex-col gap-4">
        {fonts.map((fontName) => (
          <FontCard
            key={fontName}
            fontName={fontName}
            removeCardButton={<RemoveCardButton fontName={fontName} />}
          />
        ))}

        <AddFontButton />
      </div>
    </>
  );
}

function FontCard({ fontName, removeCardButton }) {
  const url = `https://fonts.google.com/?query=${fontName.split(" ").join("+")}`;

  return (
    <div className="p-3 pt-1 bg-gray-600 rounded-md">
      <div className="flex items-center gap-4">
        <span className="text-base text-gray-700">{fontName}</span>
        <SpacerStyl />
        <Tags fontName={fontName}></Tags>
        {removeCardButton}
      </div>
      <div className="flex items-end gap-6 mt-3">
        <DisplayText fontName={fontName} />
        <GoButton url={url}></GoButton>
      </div>
    </div>
  );
}

function DisplayText({ fontName }) {
  const displayText = useSelector((store) => store.displayText);

  return (
    <p style={{ fontFamily: fontName }} className="w-full m-0 text-2xl">
      {displayText}
    </p>
  );
}

function RemoveCardButton({ fontName }) {
  const dispatch = useDispatch();

  return (
    <FontAwesomeIcon
      icon={faXmark}
      className=" hover:text-white pr-1 text-gray-600 cursor-pointer"
      onClick={() => {
        dispatch(removeFont(fontName));
      }}
    />
  );
}

function Tags({ fontName }) {
  const [tag, setTag] = useState(
    localStorage.getItem(fontName) ?? availableTags.slice(-1)[0]
  );

  const changeTag = (fontName, newTag) => {
    setTag(newTag);
    if (newTag === availableTags.slice(-1)[0]) localStorage.removeItem(fontName);
    else localStorage.setItem(fontName, newTag);
  };

  return (
    <>
      <RadioGroup
        value={tag}
        defaultValue={availableTags.slice(-1)[0]}
        onChange={(e) => {
          changeTag(fontName, e.target.value);
        }}
        row
      >
        {availableTags.map((availableTag) => (
          <FormControlLabel
            key={availableTag}
            value={availableTag}
            label={availableTag}
            control={<Radio size="small" />}
            componentsProps={{ typography: { className: "text-xs" } }}
          />
        ))}
      </RadioGroup>
    </>
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
      className="place-items-center rounded-3xl hover:opacity-100 focus-within:opacity-100 opacity-40 grid w-2/5 h-16 mx-auto bg-gray-200 border-4 border-gray-200 cursor-pointer"
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
              // addFont(e.target.value);
              setIsEditing(false);
            } else if (e.key === "Escape") {
              setIsEditing(false);
            }
          }}
        />
      ) : (
        <FontAwesomeIcon icon={faPlus} size="2x" className="text-gray-600" />
      )}
    </div>
  );
}
