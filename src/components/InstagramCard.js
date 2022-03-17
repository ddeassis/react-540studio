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
      <FiInstagram className="absolute -left-2 -top-3 md:-left-4 md:-top-5 text-teal-700 dark:text-teal-500 w-8 h-8 md:w-10 md:h-10 -rotate-6" />
      {media_type === "IMAGE" || media_type === "CAROUSEL_ALBUM" ? (
        <figure>
          <a href={permalink}>
            <img src={media_url} alt={caption} />
          </a>
          <figcaption className="p-2">{caption}</figcaption>
        </figure>
      ) : null}
    </article>
  );
}
