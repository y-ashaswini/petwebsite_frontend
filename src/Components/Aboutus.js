import { useNavigate } from "react-router-dom";
export default function Aboutus() {
  let navigate = useNavigate();
  return (
    <>
      <span className="flex gap-x-4 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-7 h-7 cursor-pointer text-slate-600 hover:bg-slate-300 p-1 mb-2 rounded-md"
          onClick={() => navigate(-1)}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
        <div className="md:text-3xl text-lg font-bold text-slate-600">
          About us
        </div>
      </span>
      <div className="my-4 md:my-8 flex">
        <span className="bg-slate-600 text-white font-bold text-center md:p-8 p-4 md:px-6 rounded-s-md w-fit text-2xl min-w-[10vw] flex items-center">
          WHO ARE WE
        </span>
        <span className="bg-slate-200 text-slate-500 block md:p-8 p-4 font-bold rounded-e-md">
          Pettera is an early-stage start-up that is on a mission to build a
          community that supports animals in need. We are passionate about
          creating a platform that connects animal lovers with animals that
          require our assistance, and we need your help to achieve this goal.
        </span>
      </div>
      <div className="my-4 md:my-8 flex">
        <span className="bg-slate-200 text-slate-500 block md:p-8 p-4 font-bold rounded-s-md">
          At Pettera, our mission is simple: we want to make a difference in the
          world and help animals in need. We believe that animals deserve love,
          care, and respect, and we are dedicated to building a community that
          supports them in every way possible. Our vision is to create a
          platform that connects animal lovers with animals that require our
          assistance, whether it's through adoption, fostering, volunteering, or
          donating.
        </span>
        <span className="bg-slate-600 text-white font-bold text-center md:p-8 p-4 md:px-6 rounded-e-md w-fit text-2xl min-w-[10vw] flex items-center">
          OUR MISSION
        </span>
      </div>
      <div className="my-4 md:my-8 flex">
        <span className="bg-slate-600 text-white font-bold text-center md:p-8 p-4 md:px-6 rounded-s-md w-fit text-2xl min-w-[10vw] flex items-center">
          HOW YOU CAN HELP
        </span>
        <span className="bg-slate-200 text-slate-500 block md:p-8 p-4 font-bold rounded-e-md">
          You can help make a difference for animals by spreading the word about
          our community and inviting your friends and family to join us.
          Together, we can create a movement for animal welfare that reaches far
          and wide. By being an active member of our community, you can make a
          real impact on the lives of animals in need. Share your ideas and
          suggestions for ways we can improve and become more effective in
          helping animals
        </span>
      </div>
      <div className="my-4 md:my-8 flex flex-col">
        <span className="bg-slate-600 text-white font-bold text-center md:p-8 p-4 md:px-6 text-2xl flex items-center">
          MORE ABOUT OUR COMMUNITY
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
    </>
  );
}
