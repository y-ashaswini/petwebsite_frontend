import { useNavigate } from "react-router-dom";
export default function NotSignedin() {
  let navigate = useNavigate();
  return (
    <>
      <div className="md:text-3xl text-lg font-bold text-slate-600">
        You're Signed Out.
      </div>
      <button
        type="button"
        onClick={() => navigate("/signin")}
        className="bg-slate-600 text-white font-bold text-center px-3 py-1 rounded-sm cursor-pointer border-2 border-slate-600 outline-none w-fit"
      >
        GO TO SIGN IN PAGE
      </button>
    </>
  );
}
