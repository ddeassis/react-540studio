export default function TwitterCard({ text }) {
  return (
    <article className="rounded-sm border border-green-500 shadow shadow-green-800 p-3 md:p-4 lg:p-6 transition duration-500 ease-in-out hover:scale-110 hover:border-green-400">
      <div
        className="prose text-stone-100 md:prose-lg lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: text }}
      ></div>
    </article>
  );
}
