import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userDataContext } from "../App";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useContext } from "react";
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_API_ANON_KEY
);

export default function Signout() {
  let navigate = useNavigate();
  const { u_email, set_u_role, set_u_email } = useContext(userDataContext);
  async function handleSignout() {
    const toast_param = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    };
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Sign out unsuccessful", toast_param);
    } else {
      toast.info("Signed out successfuly", toast_param);
    }

    set_u_email("");
    set_u_role("");
    navigate("/");
  }

  return u_email && u_email.trim() === "" ? (
    <></>
  ) : (
    <div
      className="bg-slate-300 hover:bg-slate-500 text-white font-bold text-center px-3 py-1 rounded-sm cursor-pointer outline-none w-fit"
      onClick={handleSignout}
    >
      SIGN OUT
    </div>
  );
}
