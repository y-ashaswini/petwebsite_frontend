import { Link } from "react-router-dom";

export default function Dump() {
  return (
    <div className="text-slate-600 flex flex-col items-center">
      <div className="md:text-[10vw] text-[5vw] font-bold">404</div>
      <div className="italic">Sorry, this page doesn't exist!</div>
      <Link
        to="/"
        className="px-2 py-1 bg-slate-300 m-4 hover:text-slate-900 font-bold rounded-md"
      >
        Go home
      </Link>
    </div>
  );
}
