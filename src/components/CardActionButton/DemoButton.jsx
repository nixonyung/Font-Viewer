import { useDispatch } from "react-redux";
import { updateDemoFontIdx } from "../../redux/demoFontIdxSlice";
import { updateDemoModalOpened } from "../../redux/demoModalOpenedSlice";
import CardActionButton from "./CardActionButton";

export default function DemoButton({ fontIdx, ...props }) {
  const dispatch = useDispatch();

  return (
    <CardActionButton
      {...props}
      onClick={() => {
        dispatch(updateDemoModalOpened(true));
        dispatch(updateDemoFontIdx({ value: fontIdx }));
      }}
    >
      Demo
    </CardActionButton>
  );
}
