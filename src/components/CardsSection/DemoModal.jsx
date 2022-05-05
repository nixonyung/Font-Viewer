import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image, Modal, Pagination } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDemoFontIdx } from "../../redux/demoFontIdxSlice";
import { updateDemoModalOpened } from "../../redux/demoModalOpenedSlice";
import getFontTag from "../../utils/getFontTag";

function importAll(r) {
  return r.keys().map(r);
}
const demoImages = importAll(
  require.context("../../images", false, /\.(png|jpe?g|svg)$/)
);

export default function DemoModal() {
  const demoFontIdx = useSelector((store) => store.demoFontIdx);
  const demoModalOpened = useSelector((store) => store.demoModalOpened);
  const displayText = useSelector((store) => store.displayText);
  const fonts = useSelector((store) => store.fonts);
  const demoFontTag = getFontTag(fonts[demoFontIdx]);
  const [demoImgIdx, setDemoImgIdx] = useState(1);
  const dispatch = useDispatch();

  const keydownHandler = useCallback(
    (e) => {
      if (!demoModalOpened) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        dispatch(updateDemoFontIdx({ type: "dec", fontsLength: fonts.length }));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        dispatch(updateDemoFontIdx({ type: "inc", fontsLength: fonts.length }));
      }
    },
    [demoModalOpened, fonts, dispatch]
  );

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler);
  }, [demoModalOpened, keydownHandler]);

  const demoTextStyles = [
    {
      top: 380,
      left: 100,
      width: 240,
      fontSize: 16,
      fontFamily: fonts[demoFontIdx],
    },
    {
      top: 100,
      left: 100,
      width: 500,
      fontSize: 32,
      fontFamily: fonts[demoFontIdx],
    },
    {
      top: 420,
      left: "50%",
      transform: "translateX(-50%)",
      width: 750,
      fontSize: 28,
      textAlign: "center",
      fontFamily: fonts[demoFontIdx],
    },
  ];

  return (
    <Modal
      opened={demoModalOpened}
      onClose={() => dispatch(updateDemoModalOpened(false))}
      padding={0}
      classNames={{
        header: "hidden",
        modal: "w-auto",
        body: "text-white relative",
      }}
      closeOnEscape
      closeOnClickOutside={false}
      trapFocus={false}
    >
      <Image
        src={demoImages[demoImgIdx - 1]}
        alt={`demo${demoImgIdx}`}
        height="80vh"
        className="select-none"
      />
      <p style={demoTextStyles[demoImgIdx - 1]} className="absolute select-none">
        {displayText}
      </p>

      <h2 className="-top-8 absolute text-xl">
        {fonts[demoFontIdx]}{" "}
        <span className="text-sm text-gray-400">[{demoFontTag}]</span>
      </h2>
      <FontAwesomeIcon
        icon={faLeftLong}
        size="2x"
        className="top-1/2 -left-24 absolute p-4 -translate-y-1/2 border-4 border-gray-400 border-solid rounded-full cursor-pointer select-none"
        onClick={() =>
          dispatch(updateDemoFontIdx({ type: "dec", fontsLength: fonts.length }))
        }
      />
      <FontAwesomeIcon
        icon={faRightLong}
        size="2x"
        className="top-1/2 -right-24 absolute p-4 -translate-y-1/2 border-4 border-gray-400 border-solid rounded-full cursor-pointer select-none"
        onClick={() =>
          dispatch(updateDemoFontIdx({ type: "inc", fontsLength: fonts.length }))
        }
      />
      <Pagination
        total={demoImages.length}
        page={demoImgIdx}
        onChange={setDemoImgIdx}
        className="-bottom-12 left-1/2 absolute -translate-x-1/2"
        classNames={{
          active: "bg-gray-400 text-black",
          item: "bg-gray-800 text-gray-600",
        }}
        withControls={false}
      />
    </Modal>
  );
}
