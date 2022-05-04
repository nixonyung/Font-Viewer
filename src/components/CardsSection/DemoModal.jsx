import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image, Modal } from "@mantine/core";
import { useSelector } from "react-redux";
import demoImg from "../../images/Instagram story - 1.png";
import getFontTag from "../../utils/getFontTag";

export default function DemoModal({
  isDemoOpened,
  setIsDemoOpened,
  demoFontIdx,
  setDemoFontIdx,
}) {
  const displayText = useSelector((store) => store.displayText);
  const fonts = useSelector((store) => store.fonts);
  const demoFontTag = getFontTag(fonts[demoFontIdx]);

  return (
    <Modal
      opened={isDemoOpened}
      onClose={() => setIsDemoOpened(false)}
      padding={0}
      classNames={{
        header: "hidden",
        modal: "w-auto",
        body: "text-white relative",
      }}
      centered
    >
      <Image src={demoImg} alt="haha" height="80vh" className="select-none"></Image>
      <p
        style={{
          position: "absolute",
          top: "380px",
          left: "100px",
          width: "240px",
          fontSize: "16px",
          fontFamily: fonts[demoFontIdx],
          userSelect: "none",
        }}
      >
        {displayText}
      </p>

      <h2 className="-top-8 absolute text-xl select-none">
        {fonts[demoFontIdx]}{" "}
        <span className="text-sm text-gray-400">[{demoFontTag}]</span>
      </h2>
      <FontAwesomeIcon
        icon={faLeftLong}
        size="2x"
        className="top-1/2 -left-24 absolute p-4 -translate-y-1/2 border-4 border-gray-400 border-solid rounded-full cursor-pointer select-none"
        onClick={() => setDemoFontIdx((i) => (i - 1 + fonts.length) % fonts.length)}
      />
      <FontAwesomeIcon
        icon={faRightLong}
        size="2x"
        className="top-1/2 -right-24 absolute p-4 -translate-y-1/2 border-4 border-gray-400 border-solid rounded-full cursor-pointer select-none"
        onClick={() => setDemoFontIdx((i) => (i + 1) % fonts.length)}
      />
    </Modal>
  );
}
