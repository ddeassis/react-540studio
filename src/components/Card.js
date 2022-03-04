import React from "react";

export default function Card({ children }) {
  return (
    <div className="bg-slate-50 rounded shadow transition duration-500 ease-in-out lg:hover:scale-105 relative">
      {children}
    </div>
  );
}
