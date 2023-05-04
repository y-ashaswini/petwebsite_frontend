import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Signout from "../Authentication/Signout";

export default function Navbar({ u_role, u_email, u_last_signin }) {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchCommunity, setSearchCommunity] = useState("");

  function handleSearchCommunity(e) {
    e.preventDefault();
    console.log(searchCommunity);
  }

  function handleSearchLocation(e) {
    e.preventDefault();
    console.log(searchLocation);
  }
  return (
    <div className="sticky top-0 z-50 shadow-sm bg-white text-slate-500">
      <div className="flex py-2 px-4 items-center space-x-4 sm:max-h-[8vh]">
        {/* Website Name */}
        <span className="font-light sm:text-2xl text-lg cursor-pointer">
          <Link to="/">Pettera</Link>
        </span>

        {/* Search Bar -- Location*/}
        <form
          className="flex flex-1 outline-none items-center border space-x-2 border-slate-200 rounded-lg sm:py-1 sm:px-3 sm:mr-2"
          onSubmit={(e) => handleSearchLocation(e)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 text-slate-500"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            type="text"
            placeholder="Search for a certain city"
            className="outline-none flex-1 bg-transparent hidden sm:inline-block"
            valeu={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          <button type="submit" hidden />
        </form>

        {/* Search Bar -- Community */}
        <form
          className="flex flex-1 outline-none items-center border space-x-2 border-slate-200 rounded-lg sm:py-1 sm:px-3 sm:mr-2"
          onSubmit={(e) => handleSearchCommunity(e)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 text-slate-500"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            type="text"
            placeholder="Search for a certain community"
            className="outline-none flex-1 bg-transparent hidden sm:inline-block"
            value={searchCommunity}
            onChange={(e) => setSearchCommunity(e.target.value)}
          />
          <button type="submit" hidden />
        </form>

        {/* Resources Dropdown */}
        <span className="flex xl:min-w-[100px] items-center sm:mx-2 cursor-pointer space-x-2 hover:bg-slate-100 px-2 py-1 rounded-lg">
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
          <span className="flex-1 hidden lg:inline">Resources</span>
        </span>

        {/* Mail us */}
        <span className="flex xl:min-w-[100px] items-center sm:mx-2 cursor-pointer space-x-2 hover:bg-slate-100 px-2 py-1 rounded-lg">
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
          <span className="flex-1 hidden lg:inline">
            <Link to="/contact">Mail us</Link>
          </span>
        </span>

        {/* Home icon */}
        <span className="flex xl:min-w-[100px] items-center sm:mx-2 cursor-pointer space-x-2 hover:bg-slate-100 px-2 py-1 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
          <span className="flex-1 hidden lg:inline">
            <Link to="/">Home</Link>
          </span>
        </span>
      </div>

      <hr className="text-slate-600 mx-4 my-1 " />
      <div className="flex py-1 justify-evenly items-center text-sm space-x-4">
        <span className="text-slate-300 rounded-md text-lg font-bold">
          PROFILE
        </span>
        <hr className="rotate-90 text-slate-500 w-5" />
        {u_email.trim() === "" ? (
          <>
            <Link
              to="/signin"
              className="bg-slate-300 text-white font-bold text-center px-3 py-1 rounded-sm cursor-pointer  outline-none hover:bg-slate-500"
            >
              Sign in
            </Link>
          </>
        ) : (
          <>
            <span className="flex xl:min-w-[100px] items-center sm:mx-2 space-x-2 hover:bg-slate-100 px-2 py-1 rounded-lg">
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
              <span className="flex-1 hidden lg:inline">{u_email}</span>
            </span>
            <span className="flex xl:min-w-[100px] items-center sm:mx-2 space-x-2 hover:bg-slate-100 px-2 py-1 rounded-lg">
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
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="flex-1 hidden lg:inline">
                {u_role.toUpperCase()}
              </span>
            </span>
            <span className="flex xl:min-w-[100px] items-center sm:mx-2 space-x-2 hover:bg-slate-100 px-2 py-1 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke="none"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span className="flex-1 hidden lg:inline">{u_last_signin}</span>
            </span>
            <Signout />
          </>
        )}
      </div>
    </div>
  );
}
