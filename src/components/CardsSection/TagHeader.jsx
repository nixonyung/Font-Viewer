export default function TagHeader({ tag }) {
  return (
    <h1 id={tag} className="scroll-mt-6 mt-12 text-3xl">
      {tag}
    </h1>
  );
}
