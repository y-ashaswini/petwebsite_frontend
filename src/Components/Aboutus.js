import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Aboutus({ setShowPanel }) {
  let navigate = useNavigate();
  useEffect(() => {
    setShowPanel(false);
  }, []);

  return (
    <>
      <span className="flex gap-x-4 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-7 h-7 cursor-pointer text-blue1 hover:bg-peach1 p-1 mb-2 rounded-md"
          onClick={() => navigate(-1)}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
        <div className="md:text-3xl text-lg font-bold text-blue1">About us</div>
      </span>
      <div className="my-4 md:my-8 flex">
        <span className="bg-blue1 text-white font-bold text-center md:p-8 p-4 md:px-6 rounded-s-md w-fit lg:text-2xl md:text-xl flex items-center">
          WHO WE ARE
        </span>
        <span className="bg-peach1 text-yellow1 block md:p-8 p-4 font-bold rounded-e-md border-b-8 border-r-8 border-yellow1">
          Pettera is an early-stage start-up that is on a mission to build a
          community that supports animals in need. We are passionate about
          creating a platform that connects animal lovers with animals that
          require our assistance, and we need your help to achieve this goal.
        </span>
      </div>
      <div className="my-4 md:my-8 flex">
        <span className="bg-peach1 text-yellow1 block md:p-8 p-4 font-bold rounded-s-md border-b-8 border-l-8 border-yellow1">
          At Pettera, our mission is simple: we want to make a difference in the
          world and help animals in need. We believe that animals deserve love,
          care, and respect, and we are dedicated to building a community that
          supports them in every way possible. Our vision is to create a
          platform that connects animal lovers with animals that require our
          assistance, whether it's through adoption, fostering, volunteering, or
          donating.
        </span>
        <span className="bg-blue1 text-white font-bold text-center md:p-8 p-4 md:px-6 rounded-e-md w-fit lg:text-2xl md:text-xl flex items-center">
          OUR MISSION
        </span>
      </div>
      <div className="my-4 md:my-8 flex">
        <span className="bg-blue1 text-white font-bold text-center md:p-8 p-4 md:px-6 rounded-s-md w-fit lg:text-2xl md:text-xl flex items-center">
          HOW YOU CAN HELP
        </span>
        <span className="bg-peach1 text-yellow1 block md:p-8 p-4 font-bold rounded-e-md border-b-8 border-r-8 border-yellow1">
          You can help make a difference for animals by spreading the word about
          our community and inviting your friends and family to join us.
          Together, we can create a movement for animal welfare that reaches far
          and wide. By being an active member of our community, you can make a
          real impact on the lives of animals in need. Share your ideas and
          suggestions for ways we can improve and become more effective in
          helping animals
        </span>
      </div>
    </>
  );
}
