import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Signout from "../Authentication/Signout";
import { userDataContext } from "../App";
import logo from "../Assets/logo.jpg";

export default function Navbar() {
  // Inherit user data from Parent App
  const { u_role, u_email, u_name, u_ph } = useContext(userDataContext);
  const [searchCommunity, setSearchCommunity] = useState("");

  function handleSearchCommunity(e) {
    e.preventDefault();
    console.log(searchCommunity);
  }

  return (
    <div className="sticky top-0 z-50 shadow-sm bg-white text-slate-500">
      <div className="flex py-2 px-4 items-center space-x-4 sm:max-h-[8vh]">
        {/* Logo */}

        <Link to="/">
          <img src={logo} className="w-24 rounded-md my-1" />
        </Link>

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
            placeholder="Search for a community"
            className="outline-none flex-1 bg-transparent sm:inline-block"
            value={searchCommunity}
            onChange={(e) => setSearchCommunity(e.target.value)}
          />
          <button type="submit" hidden />
        </form>

        {/* Resources Dropdown */}
        <Link
          to="/resources"
          className="flex xl:min-w-[100px] items-center sm:mx-2 cursor-pointer space-x-2 hover:bg-slate-100 px-2 py-1 rounded-lg"
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
          <span className="flex-1 hidden lg:inline">Resources</span>
        </Link>

        {/* About us */}
        <Link
          to="/about"
          className="flex xl:min-w-[100px] items-center sm:mx-2 cursor-pointer space-x-2 hover:bg-slate-100 px-2 py-1 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="white"
            class="w-7 h-7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>

          <span className="flex-1 hidden lg:inline">About us</span>
        </Link>

        {/* Mail us */}
        <Link
          to="/contact"
          className="flex xl:min-w-[100px] items-center sm:mx-2 cursor-pointer space-x-2 hover:bg-slate-100 px-2 py-1 rounded-lg"
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
          <span className="flex-1 hidden lg:inline">Feedback!</span>
        </Link>

        {/* Home icon */}
        <Link
          to="/"
          className="flex xl:min-w-[100px] items-center sm:mx-2 cursor-pointer space-x-2 hover:bg-slate-100 px-2 py-1 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
          <span className="flex-1 hidden lg:inline">Home</span>
        </Link>
      </div>

      <hr className="text-slate-600 mx-4 my-1 " />
      <div className="flex py-1 justify-evenly items-center text-sm space-x-4">
        <span className="text-slate-300 rounded-md text-lg font-bold">
          PROFILE
        </span>
        <hr className="rotate-90 text-slate-500 w-5" />
        {!u_email || u_email.trim() === "" ? (
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
              <span className="flex-1 lg:inline">{u_email}</span>
            </span>
            <span className="flex xl:min-w-[100px] items-center sm:mx-2 space-x-2 hover:bg-slate-100 px-2 py-1 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="white"
                class="w-7 h-7"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                />
              </svg>

              <span className="flex-1 lg:inline">
                {u_name && u_name}
              </span>
            </span>
            <span className="flex xl:min-w-[100px] items-center sm:mx-2 space-x-2 hover:bg-slate-100 px-2 py-1 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>

              <span className="flex-1 lg:inline">{u_ph && u_ph}</span>
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
              <span className="flex-1 lg:inline">
                {u_role && u_role.toUpperCase()}
              </span>
            </span>

            <Signout />
          </>
        )}
      </div>
    </div>
  );
}
