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
      className="bg-blue2 p-8 rounded-md flex flex-wrap items-center text-left"
    >
      <span className="text-blue1 font-bold mr-1">{name}</span>
      <span className="rounded-sm p-1 bg-blue1 text-white font-bold">
        COMMUNITY
      </span>
      <span className="text-sm block pt-4 italic">
        {description.slice(0, 100) + "..."}
      </span>

      <Link to={`community/${name.split(" ").join("_")}`} onClick={()=>setShowPannel(false)}>
        <div className="bg-yellow1 text-white font-bold text-center py-1 px-2 md:px-6 rounded-sm mt-8 cursor-pointer">
          VISIT
        </div>
      </Link>
    </div>
  );
}
