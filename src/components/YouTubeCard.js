import React from "react";
import { FaYoutube } from "react-icons/fa";

export default function YouTubeCard({
  videoId,
  created_at,
  thumbnails,
  title,
}) {
  return (
    <div className="grid grid-cols-1 place-items-center group">
      <a href={`https://youtube.com/watch?v=${videoId}`}>
        <img
          src={
            thumbnails.maxres
              ? thumbnails.maxres.url
              : thumbnails.standard
              ? thumbnails.standard.url
              : thumbnails.high
              ? thumbnails.high.url
              : thumbnails.default.url
          }
          alt={title}
          className="rounded"
        />
      </a>
      <h2 className="absolute bottom-0 lg:-bottom-10 left-1/2 -translate-x-1/2 transition duration-500 ease-in-out group-hover:-translate-y-10 h-12 w-5/6 bg-black rounded-t text-center text-xl text-stone-100 flex justify-center items-center">
        {title}
      </h2>
      <FaYoutube className="w-8 h-8 md:w-12 md:h-12 absolute -left-2 -top-2 md:-left-4 md:-top-4 text-teal-700 dark:text-teal-500 -rotate-6" />
    </div>
  );
}
