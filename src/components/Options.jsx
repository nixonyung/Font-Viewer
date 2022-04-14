import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { importRecords } from "../app/fontRecordsSlice";

export default function Options() {
  const dispatch = useDispatch();
  const fontRecords = useSelector((state) => state.fontRecords);
  const [isShowingImport, setIsShowingImport] = useState(false);
  const [isShowingExportFontRecords, setIsShowingExportFontRecords] = useState(false);

  return (
    <div className="flex flex-col gap-4 my-4">
      <div className="flex">
        <button
          className="rounded-xl px-3 py-2 bg-blue-900"
          onClick={() => setIsShowingImport(!isShowingImport)}
        >
          Import
        </button>

        {isShowingImport && (
          <input
            className="flex-grow ml-4"
            onKeyDown={(e) => {
              if (e.key === "Enter") dispatch(importRecords(e.target.value));
            }}
          ></input>
        )}
      </div>
      <div>
        <button
          className="rounded-xl px-3 py-2 bg-blue-900"
          onClick={() => setIsShowingExportFontRecords(!isShowingExportFontRecords)}
        >
          Export
        </button>

        {isShowingExportFontRecords && (
          <span className="ml-4">{JSON.stringify(fontRecords)}</span>
        )}
      </div>
    </div>
  );
}
