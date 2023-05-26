import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userDataContext } from "../App";
import NotSignedin from "../Authentication/NotSignedin";
import emailjs from "@emailjs/browser";

export default function Mailus() {
  const { u_email, u_name } = useContext(userDataContext);
  const form = useRef();
  let navigate = useNavigate();
  function handleQuery(e) {
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
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_ID,
        process.env.REACT_APP_EMAILJS_HELP_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          toast.error(error.text, toast_param);
        }
      );
    toast.info(
      "We heard you! We'll get back to you within 2 business days",
      toast_param
    );
  }

  return u_email && u_email.trim() !== "" ? (
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
          Help us!
        </div>
      </span>
      <span className="bg-slate-200 text-slate-500 block md:p-8 p-4 mt-4 font-bold rounded-t-md">
        <div className="text-slate-600 mb-4 md:text-xl">
          Help us improve and make a difference by sharing your valuable
          feedback and suggestions!
        </div>
        <div>
          At Pettera, we're dedicated to helping animals in need and creating a
          strong community of like-minded individuals who share our passion for
          animal welfare. We can't achieve our goals without your support. You
          don't have to donate money, but you can still help us by spreading the
          word about Pettera and our work. Share our posts on social media, tell
          your friends and family about us - every little bit helps. If you're
          passionate about animal welfare, we welcome you to join our team. We
          value your suggestions and feedback on how we can improve our
          community. Together, we can make a difference in the lives of animals.
          Join us in our mission to make the world a better place for animals.
        </div>
      </span>

      <div className="max-h-[100vh] rounded-b-md bg-white flex flex-col p-6 text-slate-600 text-sm">
        <form
          ref={form}
          onSubmit={(e) => handleQuery(e)}
          className="flex flex-col space-y-4"
        >
          <label className="-mb-2 font-bold">Name</label>
          <input
            type="text"
            name="user_entername"
            className="bg-slate-100 outline-none rounded-md px-2 py-1 my"
          />
          <label className="-mb-2 font-bold">Username</label>
          <input
            type="text"
            name="user_username"
            value={u_name}
            className="bg-slate-100 outline-none rounded-md px-2 py-1 my"
          />
          <label className="-mb-2 font-bold">Email</label>
          <input
            type="email"
            name="user_email"
            className="bg-slate-100 outline-none rounded-md px-2 py-1"
            value={u_email}
          />
          <label className="-mb-2 font-bold">Message</label>
          <textarea
            name="user_message"
            className="bg-slate-100 outline-none rounded-lg p-4 items-start w-full my-2 min-h-[20vh]"
          />
          <input
            type="submit"
            value="SEND"
            className="bg-slate-600 text-white font-bold text-center px-3 py-1 rounded-sm cursor-pointer border-2 border-slate-600 outline-none w-fit"
          />
        </form>
      </div>
    </>
  ) : (
    <NotSignedin />
  );
}
