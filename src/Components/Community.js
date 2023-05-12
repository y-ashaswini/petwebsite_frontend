import { Link } from "react-router-dom";

export default function Community({ id, name, description }) {
  return (
    <div className="bg-white p-8 flex flex-wrap items-center text-left">
      <span className="text-slate-700 font-bold mr-1">{name}</span>
      <span className="rounded-sm p-1 bg-slate-200 font-bold">COMMUNITY</span>
      <span className="text-sm block py-4 italic">
        {description.slice(0, 70) + "..."}
      </span>

      <Link to={`community/${name.split(" ").join("_")}`}>
        <div className="bg-slate-600 text-white font-bold text-center py-1 px-2 md:px-6 rounded-sm mt-8 cursor-pointer">
          VISIT
        </div>
      </Link>
    </div>
  );
}
