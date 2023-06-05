import { useState, useContext } from "react";
import { createClient } from "@supabase/supabase-js";
import { Link } from "react-router-dom";
import Signout from "../Authentication/Signout";
import { userDataContext } from "../App";
import logo from "../Assets/logo.jpg";

const supabase_anon_key = process.env.REACT_APP_SUPABASE_API_ANON_KEY;
const supabase_url = process.env.REACT_APP_SUPABASE_URL;
const supabase = createClient(supabase_url, supabase_anon_key);

export default function Navbar() {
  // Inherit user data from Parent App
  const { u_role, u_email, u_name, u_ph } = useContext(userDataContext);
  const [searchCommunity, setSearchCommunity] = useState("");
  const [searchres, setSearchres] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  async function handleSearchContent(e) {
    e.preventDefault();
    if (u_email) {
      const { data, error } = await supabase
        .from("post")
        .select(
          `title, content, community(name),
        user(username)`
        )
        .textSearch("content", searchCommunity, {
          type: "websearch",
          config: "english",
        });
      if (error) console.log("search error: ", error);
      else {
        setSearchres(data);
        // console.log("data: ", data);
      }
    }
  }
  async function handleSearchTitle(e) {
    e.preventDefault();
    if (u_email) {
      const { data, error } = await supabase
        .from("post")
        .select(
          `title, content, community(name),
        user(username)`
        )
        .textSearch("title", searchCommunity, {
          type: "websearch",
          config: "english",
        });
      if (error) console.log("search error: ", error);
      else {
        setSearchres(data);
        // console.log("data: ", data);
      }
    }
  }

  return (
    <div className="sticky top-0 z-50 shadow-sm px-2 bg-white text-blue1">
      <div className="flex flex-wrap flex-1 items-center">
        <span className="flex p-1 flex-1 w-full md:w-fit items-center space-x-4 h-fit">
          {/* Logo */}
          <Link to="/" className="w-24">
            <img src={logo} className="mx-auto rounded-sm my-1" />
          </Link>
          {searchres && (
              <div
                className={
                  searchCommunity
                    ? "text-xs w-3/5 absolute max-h-40 z-50 overflow-y-scroll top-16 scrollbar-thumb-blue1 scrollbar-thumb-rounded-2xl scrollbar-track-none scrollbar-thin pr-4"
                    : "hidden"
                }
              >
                {searchres.map((each) => (
                  <Link
                    to={`community/${each.community.name.split(" ").join("_")}`}
                    className="text-blue1 flex bg-white flex-col gap-2 border-b-8 border-t-2 border-l-2 border-r-8 border-blue1 mb-2 relative p-4"
                  >
                    <span className="flex items-center justify-between font-bold">
                      <span className="md:text-xl">{each.title}</span>
                      <span className="flex gap-1 items-center">
                        <span className="bg-slate-100 px-2 py-1">
                          {each.user.username}
                        </span>
                        @
                        <span className="bg-slate-100 px-2 py-1">
                          {each.community.name}
                        </span>
                      </span>
                    </span>
                    <span className="italic">
                      {each.content.slice(0, 120) + "..."}
                    </span>
                  </Link>
                ))}
              </div>
            )}

          {/* Search Bar -- Community */}
          <form className="flex w-full outline-2 items-center border space-x-2 border-blue1 rounded-md px-2 py-1 text-sm relative overflow-x-hidden">
           
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-4 w-4 text-blue1"
            >
              <path
                fill-rule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                clip-rule="evenodd"
              />
            </svg>
            <input
              type="text"
              placeholder="Search Pettera"
              className="outline-none flex-1 bg-transparent sm:inline-block"
              value={searchCommunity}
              onChange={(e) => setSearchCommunity(e.target.value)}
            />
            <button
              type="submit"
              className={
                searchCommunity
                  ? "text-xs px-2 py-1 bg-yellow1 text-white rounded-md font-bold"
                  : "hidden"
              }
              onClick={(e) => handleSearchContent(e)}
            >
              CONTENT SEARCH
            </button>
            <button
              type="submit"
              className={
                searchCommunity
                  ? "text-xs px-2 py-1 bg-yellow1 text-white rounded-md font-bold"
                  : "hidden"
              }
              onClick={(e) => handleSearchTitle(e)}
            >
              TITLE SEARCH
            </button>
          </form>
        </span>

        <span className="flex flex-1 justify-around items-center h-fit">
          {/* Resources Dropdown */}
          <Link
            to="/resources"
            className="flex xl:min-w-[100px] items-center sm:mx-2 cursor-pointer space-x-2 hover:bg-slate-100 px-2 py-1 w-fit rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
              />
            </svg>
            <span className="hidden lg:inline">Resources</span>
          </Link>

          {/* About us */}
          <Link
            to="/about"
            className="w-fit flex xl:min-w-[100px] items-center sm:mx-2 cursor-pointer space-x-2 hover:bg-slate-100 px-2 py-1 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
              />
            </svg>

            <span className="hidden lg:inline">About us</span>
          </Link>

          {/* Mail us */}
          <Link
            to="/contact"
            className="w-fit flex xl:min-w-[100px] items-center sm:mx-2 cursor-pointer space-x-2 hover:bg-slate-100 px-2 py-1 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="white"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            <span className="hidden lg:inline">Feedback!</span>
          </Link>

          {/* Profile */}
          <div
            className={
              "w-fit flex xl:min-w-[100px] items-center sm:mx-2 cursor-pointer space-x-2 hover:bg-slate-100 px-2 py-1 rounded-lg" +
              (showProfile ? " bg-slate-100" : "")
            }
            onClick={() => setShowProfile((curr) => !curr)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <span className="hidden lg:inline">Profile</span>
          </div>
        </span>
      </div>

      <div
        className={
          showProfile
            ? "absolute right-4 top-14 p-4 z-50 bg-white border-r-8 border-b-8 border-t-2 border-l-2 border-blue1 flex flex-col gap-2 text-xs"
            : "hidden"
        }
      >
        {!u_email || u_email.trim() === "" ? (
          <>
            <Link
              to="/signin"
              className="bg-blue2 border-2 border-r-4 border-b-4 border-blue1 text-white font-bold text-center px-3 py-1 rounded-sm cursor-pointer  outline-none"
            >
              Sign in
            </Link>
          </>
        ) : (
          <>
            {u_name && (
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-blue2">
                  USERNAME
                </span>
                {u_name}
              </span>
            )}

            {u_email && (
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-blue1">EMAIL</span>
                {u_email}
              </span>
            )}

            {u_ph && (
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-blue1">
                  PHONE NO.
                </span>
                {u_ph}
              </span>
            )}

            {u_role && (
              <span className="text-sm font-bold border-r-4 border-b-4 border-blue1 text-blue1 border-2 px-2 py-1 w-fit ">
                {u_role.toUpperCase()}
              </span>
            )}
            <Signout />
          </>
        )}
      </div>
    </div>
  );
}
