import { Link } from "react-router-dom";
const date = require("date-and-time");

export default function Panel({ data }) {
  return (
    <div className="flex flex-col gap-8 text-slate-500 space-y-4 p-4 w-auto sticky top-10 h-[90vh] overflow-y-scroll scrollbar-thumb-slate-600 scrollbar-thumb-rounded-2xl scrollbar-track-slate-100 scrollbar-thin">
      {data &&
        data.map((each) => (
          <div className="bg-white p-8 flex flex-wrap items-center">
            <span className="text-slate-700 font-bold mr-1">{each.name}</span>
            <span className="rounded-sm p-1 bg-slate-200 font-bold">
              COMMUNITY
            </span>
            <span className="text-sm block py-4 italic">
              {each.description}
            </span>
            <span className="rounded-sm p-1 bg-slate-200 mr-2 font-bold block w-fit">
              STATS
            </span>

            <ul>
              <li key={Math.random()}>
                <span className="text-slate-700 font-bold inline">
                  Number of Members:{" "}
                </span>
                <span className="text-sm py-4 font-bold">32K</span>
              </li>
              <li key={Math.random()}>
                <span className="text-slate-700 font-bold">Created on: </span>
                <span className="text-sm py-4 font-bold">
                  {each.created_at}
                  {/* {date.format(each.created_at, "DD/MM/YYYY HH:mm:ss")} */}
                </span>
              </li>
            </ul>
            <Link to="./createpost">
              <div className="bg-slate-600 text-white font-bold text-center py-1 px-2 md:px-6 rounded-sm mt-8 cursor-pointer">
                CREATE POST
              </div>
            </Link>
          </div>
        ))}

      {/* data paramaters: 
          1) name
          2) description
          city_in_id
      */}
    </div>
  );
}
