import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userDataContext } from "../App";
import emailjs from "@emailjs/browser";

export default function Contribute() {
  const { u_email, u_name } = useContext(userDataContext);
  let navigate = useNavigate();
  const form = useRef();
  const [attachment, setAttachment] = useState([]);

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
  // Function for handling post
  function handlePost(e) {
    e.preventDefault();
    // console.log("form current: ", form.current);
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_ID,
        process.env.REACT_APP_EMAILJS_RESOURCES_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          toast.info("Recieved: " + result.text, toast_param);
        },
        (error) => {
          toast.error(error.text, toast_param);
        }
      );
    toast.info("We heard you! We'll get back to you soon", toast_param);
    document.getElementById("formid").reset();
    setAttachment([]);
  }

  // Function for image attaching and previewing
  function handleAttachimg(e) {
    const img = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.addEventListener("load", () => {
      if (reader.result.split("/")[0] === "data:image") {
        setAttachment([...attachment, reader.result]);
      } else {
        toast.error("Invalid attachment format", toast_param);
      }
    });
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
        className="font-bold text-blue1 rounded-lg"
      />
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
          Contribute to Resources
        </div>
      </span>

      <div className="rounded-md bg-peach1 flex flex-col p-6 m-4 text-blue1">
        <form
          id="formid"
          onSubmit={(e) => handlePost(e)}
          ref={form}
          className="flex flex-col space-y-4"
        >
          <label className="-mb-2 font-bold text-yellow1">Name</label>
          <input
            type="text"
            name="user_entername"
            className="bg-white outline-none rounded-md px-2 py-1 my"
          />
          <label className="-mb-2 font-bold text-yellow1">Username</label>
          <input
            type="text"
            name="user_username"
            value={u_name}
            className="bg-white outline-none rounded-md px-2 py-1 my"
          />
          <label className="-mb-2 font-bold text-yellow1">Email</label>
          <input
            type="email"
            name="user_email"
            className="bg-white outline-none rounded-md px-2 py-1"
            value={u_email}
          />
          <label className="-mb-2 font-bold text-yellow1">
            Topic (what will your resources help in?)
          </label>
          <input
            type="text"
            name="user_topic"
            className="bg-white outline-none rounded-md px-2 py-1"
          />
          <label className="-mb-2 font-bold text-yellow1">
            Content (include warnings, directions, points of caution, or any
            other important information)
          </label>
          <textarea
            name="user_content"
            className="bg-white outline-none rounded-lg p-4 items-start w-full my-2 min-h-[20vh]"
          />
          <span className="flex sm:flex-row flex-col justify-between items-center">
            <input
              type="submit"
              value="SUBMIT FOR REVIEWING"
              className="bg-blue1 text-white font-bold text-center px-3 py-1 rounded-sm cursor-pointer border-2 border-blue1 text-sm md:text-md hover:bg-white hover:text-blue1 outline-none"
            />

            {/* Attach images button */}
            <label for="input-file">
              <input
                type="file"
                className="hidden"
                id="input-file"
                onChange={(e) => handleAttachimg(e)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-8 h-8 cursor-pointer hover:bg-yellow1 p-1 rounded-md"
                for="input-file"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                />
              </svg>
            </label>
          </span>
          <input
            type="text"
            value={JSON.stringify(attachment)}
            name="user_img"
            className="border-2 rouneded-md text-xs outline-none border-blue1 text-slate-400 px-2 py-1"
          />
        </form>
        {/* Attachments */}
        <span className="flex flex-wrap gap-2">
          {attachment &&
            attachment.map((each) => {
              return each.split("/")[0] === "data:image" ? (
                <img src={each} className="rounded-lg max-h-[20vh] w-fit m-1" />
              ) : (
                <a
                  href={each}
                  download
                  className="bg-blue1 min-w-12 px-2 py-1 rounded-sm text-white font-bold"
                >
                  Document
                </a>
              );
            })}
        </span>
      </div>
    </>
  );
}
