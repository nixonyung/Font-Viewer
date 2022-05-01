import { faArrowDownLong, faArrowUpLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWindowScroll } from "@mantine/hooks";

export default function BackToTopButton() {
  const [scroll, ,] = useWindowScroll();
  const isTop = scroll.y <= 100;

  return (
    <>
      {isTop ? (
        <a href="#add-font">
          <button className="w-12 h-12 bg-gray-400 rounded-full cursor-pointer">
            <FontAwesomeIcon icon={faArrowDownLong} color="black" />
          </button>
        </a>
      ) : (
        <a href="#top">
          <button className="w-12 h-12 bg-gray-400 rounded-full cursor-pointer">
            <FontAwesomeIcon icon={faArrowUpLong} color="black" />
          </button>
        </a>
      )}
    </>
  );
}
