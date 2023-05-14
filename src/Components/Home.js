import { useEffect, useState } from "react";
import { useContext } from "react";
import { userDataContext } from "../App";
import NotSignedin from "../Authentication/NotSignedin";

export default function Home() {
  const { u_email } = useContext(userDataContext);

  return (
    <div className="flex flex-col space-y-4">
      <div className="my-4 flex flex-col">
        <span className="bg-slate-600 text-white font-bold text-center md:p-8 p-4 md:px-6 lg:text-2xl md:text-xl flex items-center">
          WELCOME TO PETTERA!
        </span>
        <span className="bg-slate-200 text-slate-500 block md:p-8 p-4 font-bold ">
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

      {u_email && u_email.trim() !== "" ? <></> : <NotSignedin />}
    </div>
  );
}
