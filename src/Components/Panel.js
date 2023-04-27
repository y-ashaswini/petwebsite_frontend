import { Link } from "react-router-dom";

export default function Panel() {
  function handleCreatePost() {
    console.log("create post clicked");
  }
  return (
    <div className="flex flex-col md:flex-wrap gap-8 text-slate-500 space-y-4 p-4 w-auto sticky top-10">
      <div className="bg-white p-8 flex flex-wrap items-center">
        <span className="text-slate-700 font-bold">r/bulldogsforlife</span>
        <span className="rounded-sm p-1 bg-slate-200 m-1 font-bold">
          COMMUNITY
        </span>
        <span className="text-sm block py-4 italic">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          fringilla neque ac pharetra porta. Nunc nec efficitur quam.
          Suspendisse sed posuere dolor, et pulvinar lorem.
        </span>
        <span className="rounded-sm p-1 bg-slate-200 m-1 font-bold block w-fit">
          STATS
        </span>

        <ul>
          <li>
            <span className="text-slate-700 font-bold inline">
              Number of Members:{" "}
            </span>
            <span className="text-sm py-4 font-bold">32K</span>
          </li>
          <li>
            <span className="text-slate-700 font-bold">Created on: </span>
            <span className="text-sm py-4 font-bold">12th August 2013</span>
          </li>
        </ul>
        <Link to="./createpost">
          <div
            className="bg-slate-600 text-white font-bold text-center py-1 px-2 md:px-6 rounded-lg mt-8 cursor-pointer mx-auto"
            onClick={handleCreatePost}
          >
            CREATE POST
          </div>
        </Link>
      </div>
      <div className=" bg-slate-300 rounded-md p-8">
        <span className="rounded-sm p-1 bg-white m-1 font-bold">
          SIMILAR TO THESE
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="3"
            stroke="currentColor"
            class="inline w-4 h-4 mx-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </span>
        <span className="text-sm block py-4 italic">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          fringilla neque ac pharetra porta. Nunc nec efficitur quam.
          Suspendisse sed posuere dolor, et pulvinar lorem.
        </span>
      </div>
    </div>
  );
}
