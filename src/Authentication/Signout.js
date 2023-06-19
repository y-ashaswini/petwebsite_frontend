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
  const {
    u_email,
    set_u_role,
    set_u_email,
    set_u_name,
    set_u_ph,
    set_u_id,
    set_u_uuid,
  } = useContext(userDataContext);
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
    localStorage.clear();
    set_u_email("");
    set_u_role("");
    set_u_name("");
    set_u_ph("");
    set_u_uuid("");
    set_u_id("");
    navigate("/");
  }

  return u_email && u_email.trim() === "" ? (
    <></>
  ) : (
    <div
      className="bg-blue2 border-2 border-r-4 border-b-4 border-blue1 text-white font-bold text-center px-3 py-1 rounded-sm cursor-pointer items-center outline-none w-fit h-fit"
      onClick={handleSignout}
    >
      SIGN OUT
    </div>
  );
}
