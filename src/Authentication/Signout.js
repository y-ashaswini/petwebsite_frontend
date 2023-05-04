import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_API_ANON_KEY
);

export default function Signout() {
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

    console.log("signing out");
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="font-bold text-slate-600 rounded-lg"
      />
      <div
        className="bg-slate-300 text-white font-bold text-center px-3 py-1 rounded-sm cursor-pointer  outline-none hover:bg-slate-500"
        onClick={handleSignout}
      >
        SIGN OUT
      </div>
    </>
  );
}
