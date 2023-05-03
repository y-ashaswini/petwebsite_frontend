import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Createpost() {
  let navigate = useNavigate();
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState([]);
  const [showimages, setShowimages] = useState("hidden");

  // Function for handling post
  function handlePost(e) {
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
    if (heading.trim() == "") {
      toast.warn("Please add a heading", toast_param);
    } else if (content.trim() == "") {
      toast.warn("Please add some content", toast_param);
    } else {
      localStorage.clear();
      setHeading("");
      setContent("");
      setAttachment("");
      setShowimages("hidden");
      console.log("posted!");
    }
  }

  // Function for image attaching and previewing
  function handleAttachimg(e) {
    const img = e.target.files[0];
    console.log(img);
    const reader = new FileReader();
    reader.readAsDataURL(img);
    const img_name = "uploadedimg" + img.name;
    console.log("img name: ", img_name);
    reader.addEventListener("load", () => {
      document.getElementById("previewimg").setAttribute("src", reader.result);
      setAttachment([...attachment, reader.result]);
    });
    setShowimages("");
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
      <div className="rounded-md max-h-[100vh] bg-white flex flex-col p-6 m-4 text-slate-600">
        <span className="flex justify-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-7 h-7 cursor-pointer hover:bg-slate-100 p-1 rounded-md"
            onClick={() => navigate(-1)}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
          <span className="flex items-center">
            <span className="rounded-sm p-1 bg-slate-200 m-1 font-bold text-slate-500">
              POSTING
            </span>
            <span className="text-slate-700 font-bold">@</span>
            <span className="rounded-sm p-1 bg-slate-200 m-1 font-bold text-slate-500">
              r/bulldogsforlife
            </span>
          </span>
        </span>
        <form className="block">
          <input
            type="text"
            placeholder="Heading"
            className="bg-slate-100 outline-none rounded-lg w-full p-4 my-2"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Content"
            className="bg-slate-100 outline-none rounded-lg p-4 items-start w-full my-2 min-h-[20vh]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <img
            className={"rounded-lg max-h-[20vh] my-2 " + showimages}
            id="previewimg"
          />
          <span className="flex justify-between items-center">
            <button
              className="bg-slate-600 text-white font-bold text-center px-3 py-1 rounded-md cursor-pointer border-2 border-slate-600 hover:bg-white hover:text-slate-600 outline-none"
              onClick={(e) => handlePost(e)}
            >
              POST
            </button>
            {/* Attach images button */}
            <label for="input-file">
              <input
                type="file"
                id="input-file"
                className="hidden"
                onChange={(e) => handleAttachimg(e)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-8 h-8 cursor-pointer hover:bg-slate-100 p-1 rounded-md"
                for="input-file"
                // onClick={handleAttachimg}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                />
              </svg>
            </label>
          </span>
        </form>
      </div>
    </>
  );
}
