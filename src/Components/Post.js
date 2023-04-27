import { useState } from "react";

export default function Post() {
  const commentClassArr = ["inline-block", "hidden"];
  const [showComment, setShowComment] = useState(0);
  
  function handleComment() {
    // console.log("Commmenting");
    setShowComment((curr) => !curr + 0);
  }

  function handleCommentSubmit() {
    console.log("Commmenting");
  }
  return (
    <div className="bg-white text-slate-500 flex flex-col w-auto border border-slate-200 rounded-md md:p-8 p-5">
      {/* Community Name */}
      <span className="text-sm italic">
        <span className="text-slate-700 font-bold">u/anova</span> @{" "}
        <span className="text-slate-700 font-bold">r/bulldogsforlife</span>
      </span>
      {/* Tags */}
      <span className="flex flex-wrap text-xs">
        <span className="rounded-sm p-1 bg-slate-200 m-1">#Bulldogs</span>
        <span className="rounded-sm p-1 bg-slate-200 m-1">#littledogs</span>
        <span className="rounded-sm p-1 bg-slate-200 m-1">#brownies</span>
        <span className="rounded-sm p-1 bg-slate-200 m-1">#adorable</span>
      </span>
      {/* Heading */}
      <span className="md:text-2xl text-xl text-slate-700 font-bold py-2">
        Bulldogs are the cutest, change my mind.
      </span>
      {/* Content */}
      <span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        fringilla neque ac pharetra porta. Nunc nec efficitur quam. Suspendisse
        sed posuere dolor, et pulvinar lorem.
      </span>
      <span className="flex space-x-4 pt-2">
        {/* Likes */}
        <span className="flex space-x-1 items-center hover:text-slate-700 hover:cursor-pointer">
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
        </span>
        {/* Comment */}
        <span
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
        </span>
      </span>
      <div
        className={
          "flex gap-2 py-4 items-center " + commentClassArr[showComment]
        }
      >
        <div className="rounded-full bg-slate-700 w-6 h-6"></div>
        <form className="flex flex-1 outline-none items-center border space-x-2 border-slate-400 rounded-lg sm:py-1 sm:px-3 sm:mr-2 text-sm">
          <input
            type="text"
            placeholder="Type your comment here"
            className="outline-none flex-1 bg-transparent"
          />
          <button
            type="submit"
            className="text-slate-600 font-bold hover:bg-slate-100 "
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  );
}
