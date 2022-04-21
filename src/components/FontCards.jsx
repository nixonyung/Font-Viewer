import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import GoogleFontLoader from "react-google-font-loader";
import { useDispatch, useSelector } from "react-redux";
import availableTags from "../app/availableTags";
import { addFont, addTag, removeFont, removeTag } from "../app/fontRecordsSlice";

export default function FontCards() {
  const records = useSelector((state) => state.fontRecords.records);

  return (
    <div className="flex flex-col gap-4">
      {records.map((fontRecord) => (
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
    <div className="p-3 pt-1 bg-gray-600 rounded-md">
      <div className="flex items-center gap-4">
        <span className="text-base text-gray-700">{fontName}</span>

        <span className="flex-grow"></span>

        <Tags {...{ fontName, tags }}></Tags>
        <RemoveCardButton fontName={fontName} />
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

function Tags({ fontName, tags }) {
  const dispatch = useDispatch();

  return (
    <>
      <FormGroup row={true}>
        {availableTags.map((tag) => (
          <FormControlLabel
            key={tag}
            control={<Checkbox checked={tags.includes(tag)} size="small" />}
            onChange={(e) => {
              if (e.target.checked) {
                dispatch(addTag({ fontName, tag }));
              } else {
                dispatch(removeTag({ fontName, tag }));
              }
            }}
            label={<Typography sx={{ fontSize: "0.8rem" }}>{tag}</Typography>}
          />
        ))}
      </FormGroup>
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
