import { useState, useEffect } from "react";
import Comment from "./Comment";
import useNode from "../Hooks/useNode";
import { createClient } from "@supabase/supabase-js";
import moment from "moment/moment";

const supabase_anon_key = process.env.REACT_APP_SUPABASE_API_ANON_KEY;
const supabase_url = process.env.REACT_APP_SUPABASE_URL;

const supabase = createClient(supabase_url, supabase_anon_key);

export default function Post({
  title,
  content,
  created_under_city_id,
  created_in_community_id,
  img_vid,
  created_by_user_id,
  pinned,
  comments,
  comm_name,
  comm_id,
}) {
  const [showComments, setShowComments] = useState(false);

  const [commentsData, setCommentsData] = useState(JSON.parse(comments));
  const { insertNode, deleteNode } = useNode();

  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(commentsData, folderId, item);
    setCommentsData(finalStructure);
  };

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    setCommentsData(temp);
  };

  const [user, setUser] = useState("");
  const [city, setCity] = useState("");
  const [imgs, setImgs] = useState("");
  // const [isPinned, setIsPinned] = useState(pinned);

  useEffect(() => {
    async function GET_USER_DATA() {
      let { data, error } = await supabase
        .from("user")
        .select(`*`)
        .eq("id", created_by_user_id);

      if (error) {
        console.log("error: ", error);
      } else {
        // console.log("data from get user data: ",data[0]);
        setUser(data[0]);
      }
    }

    async function GET_CITY_DATA() {
      let { data, error } = await supabase
        .from("city")
        .select("*")
        .eq("id", created_under_city_id);

      if (error) {
        console.log("error: ", error);
      } else {
        setCity(data[0]);
      }
    }

    GET_USER_DATA();
    GET_CITY_DATA();
    img_vid && img_vid.trim() !== "" && setImgs(JSON.parse(img_vid));
  }, []);

  return (
    <div
      className={
        "bg-white text-slate-500 flex flex-col w-auto border border-slate-200 rounded-md md:p-8 p-5 relative"
        // +(isPinned ? " outline outline-2 outline-slate-500" : "")
      }
    >
      {/* Community Name */}
      <span className="text-sm italic">
        <span className="text-slate-700 font-bold">{user.username}</span> @{" "}
        <span className="text-slate-700 font-bold">{city.name}</span>
      </span>
      {/* Tags */}
      <span className="flex flex-wrap text-xs">
        <span className="rounded-sm p-1 bg-slate-200 m-1">{user.email}</span>
        <span className="rounded-sm p-1 bg-slate-200 m-1">
          {moment(user.created_at).format("MMMM Do YYYY, h:mm:ss a")}
        </span>
      </span>
      {/* Heading */}
      <span className="md:text-2xl sm:text-xl text-lg text-slate-700 font-bold py-2">
        {title}
      </span>
      {/* Content */}
      <span className="sm:text-md text-sm">{content}</span>
      <span className="flex space-x-4 pt-2">
        {/* Likes */}
        {/* <span className="flex space-x-1 items-center hover:text-slate-700 hover:cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>

          <span className="text-sm font-bold ">5.7K</span>
        </span> */}
        {/* Comment */}
        {/* <span
          className="flex space-x-1 items-center hover:text-slate-700 hover:cursor-pointer"
          onClick={handleComment}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            class="w-6 h-6"
            stroke-width="1"
            stroke="white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
          <span className="text-sm font-bold ">2.1K</span>
        </span> */}
      </span>
      {/* Image / Video files */}

      <span className="flex gap-2 flex-wrap">
        {imgs &&
          imgs.map((each) => {
            return each.split(";")[0] === "data:text/plain" ? (
              <a
                href={each}
                download
                className="bg-slate-400 px-2 py-1 rounded-sm text-white font-bold"
              >
                Document
              </a>
            ) : (
              <img src={each} className="rounded-lg h-[20vh] w-fit m-1" />
            );
          })}
      </span>
      <div
        className="font-bold border-2 text-xs cursor-pointer text-slate-400 border-slate-400 px-2 py-1 rounded-sm w-fit"
        onClick={() => setShowComments((curr) => !curr)}
      >
        {showComments ? "HIDE" : "SHOW"} COMMENTS
      </div>

      {/* Comments */}

      {showComments && (
        <Comment
          handleInsertNode={handleInsertNode}
          handleDeleteNode={handleDeleteNode}
          comment={commentsData}
          comm_name={comm_name}
          comm_id={comm_id}
          comm_user="username_here"
        />
      )}
    </div>
  );
}
