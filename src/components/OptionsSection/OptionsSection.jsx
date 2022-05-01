import ExportToggleButton from "./ExportToggleButton";
import ImportToggleButton from "./ImportToggleButton";
import ResetFontsButton from "./ResetFontsButton";

export default function OptionsSection() {
  return (
    <section className="flex flex-col gap-4 my-4">
      <ImportToggleButton />
      <ExportToggleButton />
      <ResetFontsButton />
    </section>
  );
}
