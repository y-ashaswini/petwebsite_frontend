import { createClient } from "@supabase/supabase-js";
import { userDataContext } from "../App";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_API_ANON_KEY
);

export default function Signup() {
  const { set_u_role, set_u_email, set_u_name, set_u_ph, u_uuid, set_u_uuid } =
    useContext(userDataContext);
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [ph, setph] = useState("");
  const loc = "Banglore"; // Location: unchangeable for now

  async function handleSignup(e) {
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
    if (username.trim() == "" || email.trim() == "" || password.trim() == "") {
      toast.error("Please fill up all the fields", toast_param);
    } else if (confirmpass != password) {
      toast.error("Your passwords don't match", toast_param);
    } else {
      console.log("credentials accepted");

      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        console.log(error);
      }
      if (data) {
        // console.log("data: ", data);
        toast.info("Account created successfuly", toast_param);
        set_u_email(email);
        set_u_name(username);
        set_u_ph(ph);
        set_u_role(data.user.aud);
        set_u_uuid(data.user.id);
        const insertdata = {
          username: username,
          email: email,
          phone: ph,
          city_from_id: 1,
          user_uuid: u_uuid,
        };
        const { data: adddata, usertableerror } = await supabase
          .from("user")
          .insert([insertdata]);
        if (usertableerror) {
          console.log("adding data error: ", usertableerror);
          // toast.error(
          //   "Adding user to db error: " + usertableerror,
          //   toast_param
          // );
        } else {
          console.log("adddata: ", adddata);
          // toast.info("Added user to db, data: " + adddata, toast_param);

          // navigate("/");
        }
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
      <span className="flex gap-x-4 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-7 h-7 cursor-pointer text-slate-600 hover:bg-slate-300 p-1 mb-2 rounded-md"
          onClick={() => navigate(-1)}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
        <div className="md:text-3xl text-lg font-bold text-slate-600">
          Sign up
        </div>
      </span>
      <div className="rounded-md max-h-[100vh] bg-white flex flex-col p-6 m-4 text-slate-600">
        <form className="flex flex-col space-y-8">
          <input
            type="text"
            placeholder="Choose a username"
            className="bg-slate-100 outline-none rounded-md px-2 py-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="text"
            placeholder="Email"
            className="bg-slate-100 outline-none rounded-md px-2 py-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <span className="flex gap-x-4">
            <input
              type="password"
              placeholder="Set a strong password"
              className="flex-1 bg-slate-100 outline-none rounded-md px-2 py-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm your password"
              className="flex-1 bg-slate-100 outline-none rounded-md px-2 py-1"
              value={confirmpass}
              onChange={(e) => setConfirmpass(e.target.value)}
            />
          </span>
          <span className="flex gap-x-4">
            <span className="flex flex-col space-y-2 flex-1">
              <span className="font-bold">Which city do you live in?</span>
              <input
                type="email"
                placeholder="Location"
                className="flex-1 bg-slate-100 outline-none rounded-md px-2 py-1"
                value={loc}
              />
            </span>
            <span className="flex flex-col space-y-2 flex-1">
              <span className="font-bold">Enter your contact number</span>
              <input
                type="number"
                placeholder="(+91)"
                className="flex-1 bg-slate-100 outline-none rounded-md px-2 py-1"
                value={ph}
                onChange={(e) => setph(e.target.value)}
              />
            </span>
          </span>

          <button
            className="bg-slate-600 text-white font-bold text-center px-3 py-1 rounded-sm cursor-pointer border-2 border-slate-600 outline-none w-fit"
            onClick={(e) => handleSignup(e)}
          >
            SIGN UP
          </button>
        </form>
      </div>
      <span className="text-slate-600">
        Have an account already?{" "}
        <Link
          to="/signin"
          className="font-bold hover:underline hover:underline-offset-2"
        >
          Sign in instead
        </Link>
        .
      </span>
    </>
  );
}
