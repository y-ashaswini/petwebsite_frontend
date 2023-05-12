import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Post from "./Post";
import Createpost from "./Createpost";

const supabase_anon_key = process.env.REACT_APP_SUPABASE_API_ANON_KEY;
const supabase_url = process.env.REACT_APP_SUPABASE_URL;
const supabase = createClient(supabase_url, supabase_anon_key);

export default function CommunityExpanded() {
  var currComm;
  const [renderingID, setRenderingID] = useState("");
  const [toggleInfo, setToggleInfo] = useState(0);
  const [togglePost, setTogglepost] = useState(0);
  const showOptions = ["hidden", ""];
  const [currCommName, setCurrCommName] = useState("");
  const [postData, setPostData] = useState("");
  const [commDesc, setCommDesc] = useState("");
  const [commId, setCommId] = useState("");

  async function GET_POSTS() {
    currComm = window.location.pathname.split("/").slice(-1)[0];
    setCurrCommName(currComm.split("_").join(" "));
    let { data, error } = await supabase
      .from("community")
      .select(
        `
          id,
          description,
          post (*)
      `
      )
      .eq("name", currCommName);

    if (error) {
      console.log("error: ", error);
    } else {
      setRenderingID("d");
      setCommId(data[0].id);
      setPostData(data[0].post);
      setCommDesc(data[0].description);
    }
  }

  useEffect(() => {
    GET_POSTS();
  }, [renderingID]);


  return (
    <div className="flex flex-col space-y-12">
      <span className="flex justify-between items-center text-slate-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="white"
          className="w-8 h-8 cursor-pointer"
          onClick={()=>setToggleInfo((curr) => !curr + 0)}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>

        <div className="md:text-3xl text-lg font-bold ">
          {currCommName + ""}
        </div>

        <button
          className="bg-slate-600 text-white font-bold text-center px-3 py-1 rounded-sm cursor-pointer border-2 border-slate-600 outline-none w-fit"
          onClick={()=>setTogglepost((curr)=>!curr+0)}
        >
          CREATE POST
        </button>
      </span>
      <span
        className={
          "bg-slate-200 text-slate-500 block md:p-8 p-4 text-sm font-bold " +
          showOptions[toggleInfo]
        }
      >
        {commDesc}
      </span>
      <span className={showOptions[togglePost]}><Createpost comm_name = {currCommName} comm_id = {commId} /></span>
      {postData &&
        postData.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            content={post.content}
            created_by_user_id={post.created_by_user_id}
            created_under_city_id={post.created_under_city_id}
            created_in_community_id={post.created_in_community_id}
          />
        ))}
    </div>
  );
}
