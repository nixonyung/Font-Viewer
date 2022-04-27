import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import GoogleFontLoader from "react-google-font-loader";
import { useDispatch, useSelector } from "react-redux";
import availableTags from "../app/availableTags";
import { addFont, removeFont } from "../app/fontsSlice";
import getFontTag from "../utils/getFontTag";

export default function FontCards() {
  const fonts = useSelector((store) => store.fonts);
  let lastTag = "";

  return (
    <>
      <GoogleFontLoader
        fonts={fonts.map((font) => ({
          font,
          weights: [...Array(9).keys()].map((v) => (v + 1) * 100),
        }))}
      />

      <div className="flex flex-col gap-4">
        {fonts.map((fontName) => {
          const thisTag = getFontTag(fontName);
          const withHeader = thisTag !== lastTag;
          lastTag = thisTag;

          return (
            <Fragment key={fontName}>
              {withHeader && <TagHeader tag={thisTag} />}
              <FontCard fontName={fontName} />
            </Fragment>
          );
        })}

        <AddFontButton />
      </div>
    </>
  );
}

function TagHeader({ tag }) {
  return (
    <h1 id={tag} className="scroll-mt-6 mt-12">
      {tag}
    </h1>
  );
}

function FontCard({ fontName }) {
  return (
    <div className="p-3 pt-1 bg-gray-600 rounded-md">
      <div className="flex items-center gap-4">
        <FontName />
        <Tags />
        <RemoveCardButton />
      </div>
      <div className="flex items-end gap-6 mt-3">
        <DisplayText fontName={fontName} />
        <GoButton />
      </div>
    </div>
  );

  function FontName() {
    return <span className="flex-grow text-gray-400">{fontName}</span>;
  }

  function Tags() {
    const [tag, setTag] = useState(getFontTag(fontName));

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

  function RemoveCardButton() {
    const dispatch = useDispatch();

    return (
      <FontAwesomeIcon
        icon={faXmark}
        className=" hover:text-white pr-1 text-gray-400 cursor-pointer"
        onClick={() => {
          dispatch(removeFont(fontName));
        }}
      />
    );
  }

  function DisplayText() {
    const displayText = useSelector((store) => store.displayText);
    const styles = useSelector((store) => store.displayTextOptions.styles);
    const fontWeight = useSelector((store) => store.displayTextOptions.fontWeight);
    const letterSpacing = useSelector(
      (store) => store.displayTextOptions.letterSpacing
    );
    const fontSize = useSelector((store) => store.displayTextOptions.fontSize) + "rem";

    return (
      <p
        style={{
          fontFamily: `${fontName}, Alien Twits`,
          fontWeight: styles.includes("bold") ? "bold" : fontWeight,
          fontStyle: styles.includes("italic") ? "italic" : "",
          textDecoration: styles.includes("underline") ? "underline" : "",
          fontSize,
          letterSpacing,
        }}
        className="w-full m-0"
      >
        {displayText}
      </p>
    );
  }

  function GoButton() {
    const url = `https://fonts.google.com/?query=${fontName.split(" ").join("+")}`;

    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-xl px-4 py-2 mr-3 text-white no-underline bg-gray-800"
      >
        Go
      </a>
    );
  }
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
      id="add-font"
      className="place-items-center rounded-3xl hover:opacity-100 focus-within:opacity-100 opacity-40 grid w-2/5 h-16 mx-auto bg-gray-400 cursor-pointer"
      onClick={(e) => {
        setIsEditing(true);
      }}
    >
      {isEditing ? (
        <input
          ref={newFontRef}
          className="text-center bg-gray-400 border-none outline-none"
          onBlur={(e) => {
            setIsEditing(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              dispatch(addFont(e.target.value));
              // addFont(e.target.value)
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
