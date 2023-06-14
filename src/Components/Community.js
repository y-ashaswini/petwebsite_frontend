import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Community({
  id,
  name,
  description,
  showPannel,
  setShowPannel,
}) {
  return (
    <div
      key={id}
      className="bg-blue2 p-6 rounded-md flex flex-wrap items-center text-left border-2 border-b-8 border-r-8 border-blue1"
    >
      <span className="text-blue1 font-bold mr-2">{name}</span>
      <span className="rounded-sm py-1 px-2 text-xs bg-blue1 text-white font-bold">
        COMMUNITY
      </span>
      <span className="text-sm block pt-4 italic">
        {description.slice(0, 100) + "..."}
      </span>

      <Link
        to={`community/${name.split(" ").join("_")}`}
        onClick={() => setShowPannel(false)}
      >
        <div className="bg-peach1 text-yellow1 border-1 border-b-4 border-r-4 border-yellow1 font-bold text-center py-1 px-2 md:px-6 rounded-md mt-8 cursor-pointer">
          VISIT
        </div>
      </Link>
    </div>
  );
}
