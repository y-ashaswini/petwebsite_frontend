import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_API_ANON_KEY
);

export default function Signin({ setShowPanel }) {
  const {
    set_u_role,
    set_u_email,
    u_email,
    set_u_name,
    set_u_ph,
    set_u_id,
    set_u_uuid,
  } = useContext(userDataContext);

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

  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function getUserDeets(useruuid) {
    let { data: userdbdata, userdberror } = await supabase
      .from("user")
      .select("id,username")
      .eq("user_uuid", useruuid);
    if (userdberror) console.log("user id error: ", userdberror);
    else {
      return userdbdata;
    }
  }

  async function handleSignin(e) {
    e.preventDefault();
    if (
      (email && email.trim() === "") ||
      (password && password.trim() === "")
    ) {
      toast.error("Please fill up all the fields", toast_param);
    } else {
      localStorage.clear();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        toast.error(error, toast_param);
      }
      if (data) {
        // console.log("user sign in data: ", data);
        if (data.user === null || data.session === null) {
          toast.error(
            "No such account in our database please try again",
            toast_param
          );
        } else {
          // console.log("user data: ", data.user);
          set_u_email(email);
          set_u_ph(data.user.phone);
          set_u_uuid(data.user.id);
          const userdbdata = await getUserDeets(data.user.id);
          set_u_id(userdbdata[0].id);
          set_u_name(userdbdata[0].username);
          set_u_role(userdbdata[0].is_admin);
          // toast.info("Sign in successful", toast_param);
          navigate("/");
        }
      }
    }
  }

  useEffect(() => {
    setShowPanel(false);
  }, []);

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
        className="font-bold text-blue1 rounded-lg"
      />

      {!u_email || (u_email && u_email.trim()) === "" ? (
        <>
          <span className="flex gap-x-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-7 h-7 cursor-pointer text-blue1 hover:bg-peach1 p-1 mb-2 rounded-md"
              onClick={() => navigate(-1)}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
            <div className="md:text-3xl text-lg font-bold text-blue1">
              Sign in
            </div>
          </span>
          <div className="rounded-md max-h-[100vh] bg-peach1 flex flex-col p-6 m-4 text-yellow1 border-2 border-b-8 border-r-8 border-yellow1">
            <form className="flex flex-col space-y-8">
              <input
                type="text"
                placeholder="Email"
                className="bg-white text-blue1 outline-none rounded-md px-2 py-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="bg-white text-blue1 outline-none rounded-md px-2 py-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                className="bg-blue1 text-white font-bold text-center px-3 py-1 rounded-sm cursor-pointer border-2 border-blue1 outline-none w-fit"
                onClick={(e) => handleSignin(e)}
              >
                SIGN IN
              </button>
            </form>
          </div>
          <span className="text-blue1">
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
      ) : (
        <>
          <div className="md:text-3xl my-2 text-lg font-bold text-slate-600">
            You're already Signed in.
          </div>
          <Link
            to="/"
            className="bg-slate-600 text-white font-bold text-center px-3 py-1 rounded-sm cursor-pointer outline-none"
          >
            GO HOME
          </Link>
        </>
      )}
    </>
  );
}
