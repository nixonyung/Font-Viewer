import { motion } from "framer-motion";
import GoButton from "../CardActionButton/GoButton";
import DisplayText from "./DisplayText";
import FontName from "./FontName";
import RemoveButton from "./RemoveButton";
import Tags from "./Tags";

// const variants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1 },
// };

export default function Card({ fontName, demoButton }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="border-y-2 px-3 py-2 my-6 bg-gray-600 border-gray-800 border-solid rounded-md"
    >
      <div className="flex items-center gap-4">
        <FontName fontName={fontName} />
        <Tags fontName={fontName} />
        <RemoveButton fontName={fontName} />
      </div>

      <DisplayText fontName={fontName} />

      <div className="flex items-end justify-end gap-3 mt-1">
        {demoButton}
        <GoButton fontName={fontName} />
      </div>
    </motion.div>
  );
}
