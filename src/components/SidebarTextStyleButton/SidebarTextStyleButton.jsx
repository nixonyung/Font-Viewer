import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon } from "@mantine/core";
import { useDispatch } from "react-redux";

export default function SidebarTextStyleButton({ value, icon, updateFunction }) {
  const dispatch = useDispatch();

  return (
    <ActionIcon
      variant={value ? "filled" : "outline"}
      color="blue"
      size="lg"
      onClick={() => dispatch(updateFunction())}
    >
      <FontAwesomeIcon icon={icon} size="lg" />
    </ActionIcon>
  );
}
