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
  const [toggleRules, setToggleRules] = useState(0);
  const showOptions = ["hidden", ""];
  const [currCommName, setCurrCommName] = useState("");
  const [postData, setPostData] = useState("");
  const [commDesc, setCommDesc] = useState("");
  const [commId, setCommId] = useState("");
  const [commInfo, setCommInfo] = useState("");

  async function GET_POSTS() {
    currComm = window.location.pathname.split("/").slice(-1)[0];
    setCurrCommName(currComm.split("_").join(" "));
    let { data, error } = await supabase
      .from("community")
      .select(
        `
          id,
          description,
          page_info,
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
      setCommInfo(JSON.parse(data[0].page_info));
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
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
          fill="none"
          className="w-8 h-8 cursor-pointer"
          onClick={() => setToggleInfo((curr) => !curr + 0)}
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

        <div
          className="bg-slate-600 text-white font-bold text-center px-3 py-1 rounded-sm cursor-pointer border-2 border-slate-600 outline-none w-fit"
          onClick={() => setTogglepost((curr) => !curr + 0)}
        >
          {togglePost ? "CLOSE POST" : "CREATE POST"}
        </div>
      </span>
      <span
        className={
          "bg-slate-200 text-slate-500 block md:p-8 p-4 text-sm font-bold " +
          showOptions[toggleInfo]
        }
      >
        {commDesc}
      </span>
      <span className={showOptions[togglePost]}>
        <Createpost comm_name={currCommName} comm_id={commId} />
      </span>
      {/* Page Specific Resources */}
      <span className="fixed z-50 right-8 bottom-4 text-white">
        <span
          className={
            "max-w-[40vw] flex flex-col p-4 rounded-sm text-xs bg-slate-800 max-h-[50vh] overflow-y-scroll scrollbar-thumb-slate-100 scrollbar-thumb-rounded-2xl scrollbar-track-slate-100 scrollbar-thin shadow-lg " +
            showOptions[toggleRules]
          }
        >
          {Object.keys(commInfo).map((key, index) => {
            return (
              <span key={index}>
                <span className="font-bold text-sm">{key}</span>
                {commInfo[key].map((each) => {
                  return (
                    <span className="flex gap-2 my-2">
                      <span className="p-[1.5px] bg-slate-600 rounded-sm"></span>
                      <span className="italic">{each}</span>
                    </span>
                  );
                })}
              </span>
            );
          })}
        </span>
        <span
          className="py-1 px-4 my-1 rounded-sm bg-slate-900 w-full flex text-white text-xs font-bold text-center cursor-pointer shadow-lg"
          onClick={() => setToggleRules((curr) => !curr + 0)}
        >
          {toggleRules ? "CLOSE" : "RULES"}
        </span>
      </span>

      {postData &&
        postData.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            content={post.content}
            img_vid={post.img_vid}
            created_by_user_id={post.created_by_user_id}
            created_under_city_id={post.created_under_city_id}
            created_in_community_id={post.created_in_community_id}
            comments={post.comments}
            pinned={post.pinned}
            comm_name={currCommName}
            // comments={post.comments}
          />
        ))}
    </div>
  );
}
