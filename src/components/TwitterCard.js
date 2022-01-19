import { FaRetweet } from "react-icons/fa";
export default function TwitterCard({ date, media, metrics, retweet, text }) {
  return (
    <article className="rounded border border-green-800 shadow shadow-green-800 transition duration-500 ease-in-out hover:scale-105 relative">
      {retweet && (
        <>
          <FaRetweet className="absolute -left-2 -top-2 md:-left-4 md:-top-4 text-green-400 w-6 h-6 md:w-10 md:h-10" />
          <p className="absolute left-4 md:left-8 text-xs text-stone-400">
            Retweeted
          </p>
        </>
      )}
      {media ? (
        <div
          className={`grid ${
            media.length === 2 ? `grid-cols-2` : `grid-cols-1`
          } place-items-center`}
        >
          {media.map((item) => {
            return (
              <img
                key={item.media_key}
                src={item.url}
                alt=""
                className="rounded-t h-96 w-full object-cover object-center"
              />
            );
          })}
        </div>
      ) : null}
      <div
        className="prose text-stone-100 md:prose-lg lg:prose-xl p-4 md:p-5 lg:p-7 "
        dangerouslySetInnerHTML={{
          __html: !retweet ? text : retweet[0].text,
        }}
      ></div>
      <div className="text-xs text-center">
        {retweet ? `Retweeted on ` : `Tweeted on `}
        {new Date(date).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </div>
    </article>
  );
}
