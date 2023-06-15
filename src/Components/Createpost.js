import { useState, useContext } from "react";
import { userDataContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createClient } from "@supabase/supabase-js";

const supabase_anon_key = process.env.REACT_APP_SUPABASE_API_ANON_KEY;
const supabase_url = process.env.REACT_APP_SUPABASE_URL;
const supabase = createClient(supabase_url, supabase_anon_key);

export default function Createpost({ comm_name, comm_id }) {
  const { u_id, u_name } = useContext(userDataContext);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState([]);

  // Values needed:
  // created by user id -- u_id
  // title
  // content
  // images / videos
  // city id: 1 (B'lore [default])
  // community id -- comm_id

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

  async function sendData() {
    // console.log("u_id: ",u_id,", username: ",u_name)

    const insertdata = {
      created_by_user_id: u_id,
      title: heading,
      content: content,
      created_under_city_id: 1,
      img_vid: attachment,
      created_in_community_id: comm_id,
    };
    // console.log("inserting: ", insertdata);
    const { data: _, error } = await supabase.from("post").insert([insertdata]);

    if (error) toast.error("posting error: " + error, toast_param);
    else toast.info("Posted", toast_param);
  }

  // Function for handling post
  function handlePost(e) {
    e.preventDefault();
    if (heading.trim() == "") {
      toast.warn("Please add a heading", toast_param);
    } else if (content.trim() == "") {
      toast.warn("Please add some content", toast_param);
    } else {
      setHeading("");
      setContent("");
      setAttachment("");
      sendData(); // Function for making API call
    }
  }

  // Function for image attaching and previewing
  function handleAttachimg(e) {
    const img = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(img);

    reader.addEventListener("load", () => {
      if (
        // reader.result.split(";")[0] === "data:text/plain" ||
        reader.result.split("/")[0] === "data:image"
      ) {
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
      <div className="rounded-md bg-blue2 border-2 border-r-8 border-b-8 border-blue1 flex flex-col p-6 my-4 text-blue1">
        <span className="flex items-center">
          <span className="rounded-sm p-1 bg-white m-1 font-bold text-blue1">
            POSTING
          </span>
          <span className="text-blue1 font-bold">@</span>
          <span className="rounded-sm p-1 bg-white m-1 font-bold text-blue1">
            {comm_name}
          </span>
        </span>

        <form className="block">
          <input
            type="text"
            placeholder="Heading"
            className="bg-white outline-none rounded-md w-full px-4 py-2 my-2"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Content"
            className="bg-white outline-none rounded-md p-4 items-start w-full my-2 min-h-[20vh]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <span className="flex flex-wrap gap-2">
            {attachment &&
              attachment.map((each) => {
                return each.split("/")[0] === "data:image" ? (
                  <img
                    src={each}
                    className="rounded-lg max-h-[20vh] w-fit m-1"
                  />
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

          <span className="flex justify-between items-center">
            <button
              className="bg-blue1 text-white font-bold text-center px-3 py-1 rounded-sm cursor-pointer border-2 border-blue1 hover:bg-white hover:text-blue1 outline-none"
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
                class="w-8 h-8 cursor-pointer hover:bg-peach1 p-1 rounded-md"
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
        </form>
      </div>
    </>
  );
}
