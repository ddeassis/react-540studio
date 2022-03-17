import React from "react";
import { FaYoutube } from "react-icons/fa";

export default function YouTubeCard({
  videoId,
  created_at,
  thumbnails,
  title,
}) {
  return (
    <div className="grid grid-cols-1 place-items-center relative">
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
      <h2 className="absolute bottom-0 left-1/2 -translate-x-1/2 h-14 w-5/6 bg-black rounded-t text-center md:text-lg text-stone-100 flex justify-center items-center p-2">
        {title}
      </h2>
      <div className="absolute left-4 top-2 -rotate-6 overflow-visible">
        <div className="bg-white w-6 h-6 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-0" />
        <FaYoutube className="absolute w-12 h-12 text-teal-700 dark:text-teal-500 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}
