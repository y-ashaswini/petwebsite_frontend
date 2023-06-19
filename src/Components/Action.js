import React from "react";

const Action = ({ handleClick, type }) => {
  return (
    <div
      className="bg-slate-700 text-white text-xs px-2 py-1 cursor-pointer rounded-sm tracking-wider font-bold"
      onClick={handleClick}
    >
      {type}
    </div>
  );
};

export default Action;
 