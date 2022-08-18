import Card from './Card'
import { FaTwitter } from 'react-icons/fa'
export default function TwitterCard({ date, media, metrics, retweet, text }) {
  return (
    <Card>
      <article className="relative">
        <div className="absolute left-4 top-2 -rotate-6 overflow-visible">
          <FaTwitter className="absolute w-12 h-12 text-teal-700 dark:text-teal-500 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
        </div>

        {media ? (
          <div
            className={`rounded grid ${
              media.length === 2 ? `grid-cols-2` : `grid-cols-1`
            } place-items-center`}
          >
            {media.map((item, i) => {
              return (
                <a href={item.url}>
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
                    loading="lazy"
                  />
                </a>
              )
            })}
          </div>
        ) : null}
        <div className="relative">
          {retweet && (
            <p className="text-center text-xs text-stone-800 dark:text-stone-100 pt-2">
              Retweeted from{' '}
              <a href={`https://twitter.com/${retweet.username}`}>
                {retweet.username}
              </a>
            </p>
          )}
          <div
            className="prose  md:prose-lg lg:prose-xl dark:prose-invert px-4 md:px-5 lg:px-7 py-8"
            dangerouslySetInnerHTML={{
              __html: !retweet ? text : retweet[0].text,
            }}
          ></div>
        </div>
        <div className="text-xs text-center pb-2 md:pb-3 lg:pb-4">
          {retweet ? `Retweeted on ` : `Tweeted on `}
          {new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
      </article>
    </Card>
  )
}
