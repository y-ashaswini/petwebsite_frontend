import { useEffect, useState } from "react";
import { useContext } from "react";
import { userDataContext } from "../App";
import paw from "../Assets/paw.svg";
import NotSignedin from "../Authentication/NotSignedin";
import { Link } from "react-router-dom";

export default function Home({ setShowPanel }) {
  const { u_email } = useContext(userDataContext);
  useEffect(() => {
    setShowPanel(false);
  }, []);
  return (
    <div className="flex flex-col space-y-4">
      <div className="my-4 flex flex-col">
        {u_email && u_email.trim() !== "" ? (
          <>
            <Link to="/community/General_Animal_Discussions">
              <div className="bg-blue1 opacity-90 hover:bg-blue1 hover:opacity-100 p-4 font-bold rounded-md items-center text-yellow1 flex justify-between gap-4 md:text-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  className="w-10 h-10 animate-bounce mr-4 cursor-pointer"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
                Begin exploring communities on the pane to the left!
                <img src={paw} className="w-8 h-8 text-white" />
              </div>
            </Link>
          </>
        ) : (
          <NotSignedin />
        )}
        <span className="bg-blue2 my-4 text-white font-bold text-center md:p-8 p-4 md:px-6 lg:text-2xl md:text-xl flex items-center justify-between rounded-md">
          <span>WELCOME TO PETTERA!</span>
        </span>

        <span className="bg-peach1 text-yellow1 block rounded-md md:p-8 p-4 font-bold ">
          <div className="mb-4">
            As animal lovers, we all want to help animals in need, but it can be
            overwhelming and confusing to know where to start with the 25
            Facebook groups, 20 Instagram pages and 15 WhatsApp groups. With
            Pettera's community, we make it easy for you to help animals that
            need our help. We have created 5 essential groups within our
            community that provide animal lovers with the necessary resources to
            help animals and prevent them from feeling lost.
          </div>
          <div className="mb-4">
            ​ Each of our groups has a specific purpose, whether it's sharing
            information about animal welfare, providing support for animal
            rescues, or connecting animal lovers with each other. By being a
            part of our community, you'll have access to all the tools and
            resources you need to make a real impact on the lives of animals in
            need.
          </div>
          <div className="mb-4">
            ​ We understand that helping animals can be a daunting task, but
            with Pettera, it's easy and rewarding. You'll be part of a community
            of like-minded individuals who are dedicated to making a difference
            in the lives of animals. Together, we can achieve our mission to
            help animals in need and create a better world for them. Check out
            our groups and see how you can help make a difference today. Join
            our community and be a part of the change we want to see in the
            world.
          </div>
          <div>
            ​ Take a look at the functions of 4 of our essential groups on the
            left pane on your screen to see how you can get involved in our
            community and make a real impact on the lives of animals in need.
          </div>
        </span>
      </div>
    </div>
  );
}
