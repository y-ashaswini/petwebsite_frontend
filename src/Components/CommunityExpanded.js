import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Post from "./Post";
import Createpost from "./Createpost";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const supabase_anon_key = process.env.REACT_APP_SUPABASE_API_ANON_KEY;
const supabase_url = process.env.REACT_APP_SUPABASE_URL;
const supabase = createClient(supabase_url, supabase_anon_key);

export default function CommunityExpanded({ setShowPanel }) {
  var currComm;
  const [renderingID, setRenderingID] = useState("");
  const [toggleInfo, setToggleInfo] = useState(0);
  const [togglePost, setTogglepost] = useState(0);
  const [toggleRules, setToggleRules] = useState(0);
  const showOptions = ["hidden", ""];
  const [currCommName, setCurrCommName] = useState("");
  const [postData, setPostData] = useState("");
  const [pinnedPostData, setPinnedPostData] = useState("");
  const [commDesc, setCommDesc] = useState("");
  const [commId, setCommId] = useState("");
  const [commInfo, setCommInfo] = useState("");

  // function compare(a, b) {
  //   if (a.created_at > b.created_at) return -1;
  //   if (a.created_at < b.created_at) return 1;
  //   return 0;
  // }
  function compare(a, b) {
    if (Date.parse(a.created_at) > Date.parse(b.created_at)) return -1;
    if (Date.parse(a.created_at) < Date.parse(b.created_at)) return 1;
    return 0;
  }

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
      const temp_ = data[0].post.filter((curr) => curr.pinned === true);
      const temp__ = temp_.sort(compare);
      setPinnedPostData(temp__);
      const temp___ = data[0].post.filter((curr) => curr.pinned === false);
      // const temp = temp___.sort(compare); // sorting by number of likes
      const temp = temp___.sort(compare); // sorting by date
      setPostData(temp);
      // temp.map((f) => console.log(f.created_at));
      setCommDesc(data[0].description);
      setCommInfo(JSON.parse(data[0].page_info));
    }
  }

  useEffect(() => {
    setShowPanel(false);
    GET_POSTS();
  }, [renderingID]);

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
      <div className="flex flex-col space-y-4">
        <span className="flex flex-wrap justify-between items-center">
          <span className="flex items-center gap-2 text-blue1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              fill="none"
              className="w-6 h-6 cursor-pointer mr-2 "
              onClick={() => setToggleInfo((curr) => !curr + 0)}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>

            <div
              id="create_post"
              className="md:text-3xl w-fit text-lg font-bold "
            >
              {currCommName + ""}
            </div>
          </span>

          <span
            className="bg-slate-900 text-white font-bold text-center px-3 py-1 rounded-md cursor-pointer border-2 border-slate-900 outline-none sm:text-sm text-xs mx-4"
            onClick={() => setToggleRules((curr) => !curr + 0)}
          >
            {toggleRules
              ? "CLOSE COMMUNTIY RESOURCES"
              : "SHOW COMMUNTIY RESOURCES"}
          </span>
        </span>
        <span
          className={
            "w-full flex flex-col p-4 text-white rounded-md text-xs bg-slate-800 max-h-[30vh] overflow-y-scroll scrollbar-thumb-slate-800 scrollbar-thumb-rounded-2xl scrollbar-track-slate-800 scrollbar-thin " +
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
          className={
            "bg-peach1 text-yellow1 block md:p-8 p-4 text-sm font-bold " +
            showOptions[toggleInfo]
          }
        >
          {commDesc}
        </span>
        <span className={showOptions[togglePost]}>
          <Createpost comm_name={currCommName} comm_id={commId} />
        </span>

        {/* Create Post */}
        <a
          href="#create_post"
          className="fixed z-50 md:right-8 md:bottom-8 right-4 bottom-4 shadow-lg bg-blue1 text-white rounded-full"
          onClick={() => setTogglepost((curr) => !curr + 0)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="md:w-16 md:h-16 w-12 h-12 rounded-full shadow-md"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </a>

        {/* Page Specific Resources */}
        {/* <span className="fixed z-50 right-8 bottom-4 text-white">
          <span
            className={
              "max-w-[40vw] flex flex-col p-4 rounded-sm text-xs bg-slate-800 max-h-[50vh] overflow-y-scroll scrollbar-thumb-slate-800 scrollbar-thumb-rounded-2xl scrollbar-track-slate-800 scrollbar-thin shadow-lg " +
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
        </span> */}

        {pinnedPostData ? (
          pinnedPostData.map((post) => {
            return (
              <Post
                key={post}
                id={post.id}
                title={post.title}
                content={post.content}
                img_vid={post.img_vid}
                created_by_user_id={post.created_by_user_id}
                created_under_city_id={post.created_under_city_id}
                created_in_community_id={post.created_in_community_id}
                comments={post.comments}
                pinned={post.pinned}
                comm_name={currCommName}
                likes_list={post.likes_list}
                created_at={post.created_at}
              />
            );
          })
        ) : (
          <span className="text-blue1 italic m-4">Loading...</span>
        )}

        {postData ? (
          postData.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              img_vid={post.img_vid}
              created_by_user_id={post.created_by_user_id}
              created_under_city_id={post.created_under_city_id}
              created_in_community_id={post.created_in_community_id}
              comments={post.comments}
              pinned={post.pinned}
              comm_name={currCommName}
              likes_list={post.likes_list}
              created_at={post.created_at}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
