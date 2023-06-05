import { useState, useEffect, useContext } from "react";
import Comment from "./Comment";
import useNode from "../Hooks/useNode";
import { createClient } from "@supabase/supabase-js";
import moment from "moment/moment";
import { userDataContext } from "../App";
import pin from "../Assets/pin.svg";
import { ToastContainer, toast } from "react-toastify";

const supabase_anon_key = process.env.REACT_APP_SUPABASE_API_ANON_KEY;
const supabase_url = process.env.REACT_APP_SUPABASE_URL;
const supabase = createClient(supabase_url, supabase_anon_key);

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

  const [showDel, setShowDel] = useState(u_id === created_by_user_id);
  const [showSureDel, setShowSureDel] = useState(false);

  const [isPinned, setIsPinned] = useState(pinned);
  // console.log("pinned: ",pinned);
  const [commentsData, setCommentsData] = useState(JSON.parse(comments));
  const { insertNode, deleteNode } = useNode();

  async function handleDeletePost() {
    const { data, error } = await supabase.from("post").delete().eq("id", id);
    // if (error) console.log("error deleting: ", error);
    // else console.log("post deleted successfully");
    if (error) toast.error("error deleting: " + error, toast_param);
    else toast.info("Post deleted successfully", toast_param);
  }

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
    // ONLY IF USER IS ADMIN
    const { data, error } = await supabase
      .from("post")
      .update({ pinned: !isPinned })
      .eq("id", id)
      .select();
    if (error) console.log("pinning error: ", error);
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
        "text-blue1 flex flex-col w-auto border-2 border-r-8 bg-peach1 border-b-8 rounded-md md:p-8 p-5 relative " +
        (isPinned ? "border-yellow1" : "border-peach1")
      }
    >
      {/* Pin */}
      <img
        src={pin}
        className={
          isPinned
            ? "w-5 h-5 absolute right-4 top-4 z-30 cursor-pointer"
            : "w-5 h-5 absolute right-4 top-4 z-30 opacity-20 hover:opacity-100 cursor-pointer"
        }
        onClick={handlePin}
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        className={
          showDel
            ? "w-6 h-6 absolute right-10 top-4 opacity-20 hover:opacity-100 cursor-pointer"
            : "hidden"
        }
        onClick={function () {
          setShowDel(false);
          setShowSureDel(true);
        }}
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>

      <span className={showSureDel ? "flex gap-2" : "hidden"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="3"
          stroke="currentColor"
          className="w-6 h-6 absolute right-10 top-4 opacity-20 hover:opacity-100 cursor-pointer"
          onClick={handleDeletePost}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="3"
          stroke="currentColor"
          className="w-6 h-6 absolute right-16 top-4 opacity-20 hover:opacity-100 cursor-pointer"
          onClick={function () {
            setShowDel(true);
            setShowSureDel(false);
          }}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </span>

      {/* Community Name */}
      <span className="text-sm italic">
        <span className="text-blue1 font-bold">{user.username}</span> @{" "}
        <span className="text-blue1 font-bold">{city.name}</span>
      </span>
      {/* Tags */}
      <span className="flex flex-wrap text-xs">
        <span className="rounded-sm p-1 bg-yellow1 text-peach1 font-bold m-1">{user.email}</span>
        <span className="rounded-sm p-1 bg-yellow1 text-peach1 font-bold m-1">
          {moment(user.created_at).format("MMMM Do YYYY, h:mm:ss a")}
        </span>
      </span>
      {/* Heading */}
      <span className="md:text-2xl sm:text-xl text-lg text-blue1 font-bold py-2">
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
                className="bg-blue1 px-2 py-1 rounded-sm text-white font-bold"
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
          className="font-bold border-2 text-xs cursor-pointer text-blue1 border-blue1 px-2 py-1 rounded-sm w-fit mt-2"
          onClick={() => setShowComments((curr) => !curr)}
        >
          {!showComments
            ? commentsData.items.length !== 0
              ? "SHOW " + commentsData.items.length + " COMMENT(S)"
              : "BE THE FIRST TO COMMENT!"
            : "HIDE COMMENT(S)"}
        </div>
        <span className="flex gap-2 items-center">
          {parsed_likes_list.length}
          {liked_by_curr_user ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-5 h-5 cursor-pointer"
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
              className="w-5 h-5 cursor-pointer"
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
