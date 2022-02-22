import React from "react";
import { FaYoutube } from "react-icons/fa";

export default function YouTubeCard({
  videoId,
  created_at,
  thumbnails,
  title,
}) {
  return (
    <div className="grid grid-cols-1 place-items-center">
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
      <h2 className="absolute bottom-0 h-12 w-5/6 bg-black rounded-t text-center text-xl flex justify-center items-center">
        {title}
      </h2>
      <FaYoutube className="w-12 h-12 md:w-16 md:h-16 absolute -left-2 -top-2 md:-left-4 md:-top-4 text-green-400 -rotate-6" />
    </div>
  );
}
