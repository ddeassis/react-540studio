import React from "react";
import { FiInstagram } from "react-icons/fi";

export default function InstagramCard({
  caption,
  created_at,
  media_type,
  media_url,
  permalink,
}) {
  return (
    <article className="flex flex-col">
      <div className="absolute left-4 top-2 -rotate-6 overflow-visible">
        <div className="bg-stone-200 dark:bg-stone-800 w-10 h-10 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-0 rounded-md" />
        <FiInstagram className="absolute w-12 h-12 text-teal-700 dark:text-teal-500 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
      </div>
      {media_type === "IMAGE" || media_type === "CAROUSEL_ALBUM" ? (
        <figure>
          <a href={permalink}>
            <img
              src={media_url}
              alt={caption}
              className="rounded-t"
              loading="lazy"
            />
          </a>
          <figcaption className="p-2">{caption}</figcaption>
        </figure>
      ) : null}
    </article>
  );
}
