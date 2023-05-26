import { useContext } from "react";
import { Link } from "react-router-dom";
import { intro_para, all_resources } from "../Assets/resourcesData";
import ResourceBlock from "./ResourceBlock";
import NotSignedin from "../Authentication/NotSignedin";
import { userDataContext } from "../App";
export default function Resources() {
  const { u_email } = useContext(userDataContext);
  return (
    <>
      <div className="md:text-3xl text-lg font-bold text-slate-600 flex justify-between">
        Resources
        {u_email && u_email.trim() !== "" ? (
          <Link
            to="./contribute"
            className="bg-slate-300 text-white font-bold text-center px-3 py-1 rounded-sm cursor-pointer  outline-none hover:bg-slate-500 text-lg"
          >
            CONTRIBUTE RESOURCES
          </Link>
        ) : (
          <NotSignedin />
        )}
      </div>
      <div className="my-4 md:my-8 flex flex-col">
        <span className="bg-slate-600 text-white font-bold text-center md:p-8 p-4 md:px-6 text-2xl flex items-center">
          RESOURCES
        </span>
        <span className="bg-slate-200 text-slate-500 block md:p-8 p-4 font-bold ">
          <div className="mb-4">
            At Pettera, we believe that providing resources for stray animals is
            crucial in ensuring their well-being. We understand that taking care
            of stray animals can be a challenging and overwhelming task, which
            is why we offer various resources to make it easier for individuals
            and organizations to provide help. Our resources include information
            on guides on how to catch and transport animals safely, tips on
            providing basic medical care for animals, and a list of contacts for
            veterinary care and animal shelters.
          </div>
          <div>
            We also offer educational resources to spread awareness about the
            importance of spaying and neutering animals to control the
            population of strays. We encourage individuals and organizations to
            use our resources to help stray animals in their communities. By
            doing so, we believe that we can make a significant difference in
            the lives of these animals and create a more compassionate world for
            all creatures.
          </div>
        </span>

        {/* Links to the resource pages */}
        <div className="md:text-3xl text-lg font-bold text-slate-600 flex justify-between my-4">
          List of Essential Resources
        </div>
        <span className="bg-slate-200 text-slate-500 block md:p-8 p-4 font-bold ">
          {intro_para}
        </span>
        <div className="grid grid-cols-2 gap-2 md:gap-4 mt-4">
          {all_resources.map((each_resource) => (
            <ResourceBlock each_resource={each_resource} />
          ))}
        </div>
      </div>
    </>
  );
}
