import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Mailus() {
  let navigate = useNavigate();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("johndoe@gmail.com"); // Gather the email from stored account
  const [query, setQuery] = useState("");

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
    toast.info(
      "We heard you! We'll get back to you within 2 business days",
      toast_param
    );
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

      <div className="rounded-md max-h-[100vh] bg-white flex flex-col p-6 m-4 text-slate-600 text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-7 h-7 cursor-pointer hover:bg-slate-100 p-1 mb-2 rounded-md"
          onClick={() => navigate(-1)}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>

        <form className="flex flex-col space-y-4">
          <span className="flex space-x-4">
            <input
              type="text"
              placeholder="First Name"
              className="bg-slate-100 outline-none rounded-md flex-1 px-2 py-1 max-w-[48%]"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="bg-slate-100 outline-none rounded-lg flex-1 px-2 py-1 max-w-[48%]"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </span>
          <input
            type="text"
            placeholder="Email"
            className="bg-slate-100 outline-none rounded-md px-2 py-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Content"
            className="bg-slate-100 outline-none rounded-lg p-4 items-start w-full my-2 min-h-[20vh]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="bg-slate-600 text-white font-bold text-center px-3 py-1 rounded-md cursor-pointer border-2 border-slate-600 outline-none w-fit"
            onClick={(e) => handleQuery(e)}
          >
            POST
          </button>
        </form>
      </div>
    </>
  );
}
