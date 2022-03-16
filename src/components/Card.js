import React from "react";

export default function Card({ children }) {
  return (
    <div className="bg-stone-50 dark:bg-stone-900 rounded shadow transition duration-500 ease-in-out lg:hover:scale-105 hover:z-20 relative">
      {children}
    </div>
  );
}
