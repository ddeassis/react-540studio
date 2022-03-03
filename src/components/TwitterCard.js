import Card from "./Card";
import { FaTwitter } from "react-icons/fa";
export default function TwitterCard({ date, media, metrics, retweet, text }) {
  return (
    <Card>
      <article>
        <div className="pt-1">
          <FaTwitter className="absolute -left-2 -top-3 md:-left-4 md:-top-5 text-teal-700 w-4 h-4 md:w-10 md:h-10 -rotate-6" />
        </div>

        {media ? (
          <div
            className={`rounded grid ${
              media.length === 2 ? `grid-cols-2` : `grid-cols-1`
            } place-items-center`}
          >
            {media.map((item, i) => {
              return (
                <img
                  key={item.media_key}
                  src={item.url}
                  alt=""
                  className={`${
                    media.length === 1
                      ? `rounded-t`
                      : i % 2 === 0
                      ? `rounded-tl`
                      : `rounded-tr`
                  } h-96 w-full object-cover object-center`}
                />
              );
            })}
          </div>
        ) : null}
        <div className="relative">
          {retweet && (
            <p className="absolute left-4 md:left-8 text-xs text-stone-800">
              Retweeted from{" "}
              <a href={`https://twitter.com/${retweet.username}`}>
                {retweet.username}
              </a>
            </p>
          )}
          <div
            className="prose text-stone-800 md:prose-lg lg:prose-xl p-4 md:p-5 lg:p-7 "
            dangerouslySetInnerHTML={{
              __html: !retweet ? text : retweet[0].text,
            }}
          ></div>
        </div>
        <div className="text-xs text-center pb-2 md:pb-3 lg:pb-4">
          {retweet ? `Retweeted on ` : `Tweeted on `}
          {new Date(date).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </article>
    </Card>
  );
}
