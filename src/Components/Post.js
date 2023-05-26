import { useState, useEffect, useContext } from "react";
import Comment from "./Comment";
import useNode from "../Hooks/useNode";
import { createClient } from "@supabase/supabase-js";
import moment from "moment/moment";
import { userDataContext } from "../App";
import pin from "../Assets/pin.svg";

const supabase_anon_key = process.production.REACT_APP_SUPABASE_API_ANON_KEY;
const supabase_url = process.production.REACT_APP_SUPABASE_URL;
const supabase = createClient(supabase_url, supabase_anon_key);

export default function Post({
  id,
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
  likes_list,
}) {
  const { u_id } = useContext(userDataContext);
  const [showComments, setShowComments] = useState(false);
  const [user, setUser] = useState("");
  const [city, setCity] = useState("");
  const [imgs, setImgs] = useState("");
  const [liked_by_curr_user, setLiked_by_curr_user] = useState(false);
  const [parsed_likes_list, setParsed_likes_list] = useState(
    JSON.parse(likes_list)
  );

  const [isPinned, setIsPinned] = useState(pinned);
  // console.log("pinned: ",pinned);
  const [commentsData, setCommentsData] = useState(JSON.parse(comments));
  const { insertNode, deleteNode } = useNode();

  async function setLike() {
    setLiked_by_curr_user(true);
    parsed_likes_list.push(u_id);
    setParsed_likes_list(parsed_likes_list);
    const { data, error } = await supabase
      .from("post")
      .update({ likes_list: JSON.stringify(parsed_likes_list) })
      .eq("id", id);
    if (error) console.log("liking error: ", error);
  }

  async function setDislike() {
    setLiked_by_curr_user(false);
    const temp = parsed_likes_list.filter((each) => each != u_id);
    setParsed_likes_list(temp);
    const { data, error } = await supabase
      .from("post")
      .update({ likes_list: JSON.stringify(parsed_likes_list) })
      .eq("id", id);
    if (error) console.log("disliking error: ", error);
  }

  async function handlePin() {
    // console.log("pinned before: ", isPinned);
    // ONLY IF USER IS ADMIN
    const { data, error } = await supabase
      .from("post")
      .update({ pinned: !isPinned })
      .eq("id", id)
      .select();
    if (error) console.log("pinning error: ", error);
    // else console.log("after pinning data: ", data);
    setIsPinned((curr) => !curr);
  }

  const handleInsertNode = async (
    folderId,
    item,
    username,
    userid,
    attachment
  ) => {
    const temp = insertNode(
      commentsData,
      folderId,
      item,
      username,
      userid,
      attachment
    );
    await afterAddComment(temp);
    setCommentsData(temp);
  };

  const handleDeleteNode = async (folderId, userid) => {
    const finalStructure = deleteNode(commentsData, folderId, userid);
    const temp = { ...finalStructure };
    await afterAddComment(temp);
    setCommentsData(temp);
  };

  async function afterAddComment(temp) {
    const { data: d, error } = await supabase
      .from("post")
      .update({ comments: temp })
      .eq("id", id);
    if (error) {
      console.log("Couldn't add comment: ", error);
    }
  }

  useEffect(() => {
    async function GET_USER_DATA() {
      let { data, error } = await supabase
        .from("user")
        .select(`*`)
        .eq("id", created_by_user_id);

      if (error) {
        console.log("error: ", error);
      } else {
        setUser(data[0]);
        // console.log("parsed: ",parsed_likes_list);
        // console.log("u_id: ",u_id);
        for (let i = 0; i < parsed_likes_list.length; i++) {
          if (parsed_likes_list[i] == u_id) {
            setLiked_by_curr_user(true);
            break;
          }
        }
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
        "text-slate-500 flex flex-col w-auto border border-slate-200 rounded-md md:p-8 p-5 relative " +
        (isPinned ? "bg-slate-200" : "bg-white")
      }
    >
      {/* Pin */}
      <img
        src={pin}
        className={
          isPinned
            ? "w-6 h-6 absolute right-4 top-4 z-30 cursor-pointer"
            : "w-6 h-6 absolute right-4 top-4 z-30 opacity-20 hover:opacity-100 cursor-pointer"
        }
        onClick={handlePin}
      />
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
      <span className="flex justify-between items-end">
        <div
          className="font-bold border-2 text-xs cursor-pointer text-slate-400 border-slate-400 px-2 py-1 rounded-sm w-fit mt-2"
          onClick={() => setShowComments((curr) => !curr)}
        >
          {!showComments
            ? commentsData.items.length !== 0
              ? "SHOW " + commentsData.items.length + " COMMENT(S)"
              : "BE THE FIRST TO COMMENT!"
            : "HIDE COMMENT(S)"}
        </div>
        <span className="flex gap-2">
          {parsed_likes_list.length}
          {liked_by_curr_user ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
              onClick={() => setDislike()}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
              onClick={() => setLike()}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          )}
        </span>
      </span>

      {/* Comments */}

      {showComments && (
        <Comment
          handleInsertNode={handleInsertNode}
          handleDeleteNode={handleDeleteNode}
          comment={commentsData}
          comm_name={comm_name}
          comm_id={comm_id}
        />
      )}
    </div>
  );
}
