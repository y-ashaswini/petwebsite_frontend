import { createClient } from "@supabase/supabase-js";

import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_API_ANON_KEY
);

export default function Signin() {
  console.clear();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignin(e) {
    e.preventDefault();
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
    if (email.trim() == "" || password.trim() == "") {
      toast.error("Please fill up all the fields", toast_param);
    } else {
      console.log("credentials accepted");
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log("data: ", data);
        toast.info("Signed back in successfuly", toast_param);
      }
    }
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
      <div className="md:text-3xl text-lg font-bold text-slate-600">
        Sign In
      </div>
      <div className="rounded-md max-h-[100vh] bg-white flex flex-col p-6 m-4 text-slate-600">
        <form className="flex flex-col space-y-8">
          <input
            type="text"
            placeholder="Email"
            className="bg-slate-100 outline-none rounded-md px-2 py-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="bg-slate-100 outline-none rounded-md px-2 py-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="bg-slate-600 text-white font-bold text-center px-3 py-1 rounded-sm cursor-pointer border-2 border-slate-600 outline-none w-fit"
            onClick={(e) => handleSignin(e)}
          >
            SIGN IN
          </button>
        </form>
      </div>
      <span className="text-slate-600">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-bold hover:underline hover:underline-offset-2"
        >
          Create one here
        </Link>
        .
      </span>
    </>
  );
}
