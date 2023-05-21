import { useState } from "react";

export default function ResourceBlock({ each_resource }) {
  const [showContent, toggleShowContents] = useState(false);
  const [showContact, toggleShowContacts] = useState(false);
  return (
    <div
      className={
        "bg-slate-300 flex flex-col gap-4 rounded-sm p-2 h-fit " +
        (showContent || showContact ? "col-span-2" : "")
      }
    >
      <span className="flex justify-between items-center text-slate-600">
        <span className="text-xl font-bold ">{each_resource.topic}</span>
        <span className="flex gap-2">
          {showContact ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
              onClick={() => toggleShowContacts((curr) => !curr)}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
              onClick={() => toggleShowContacts((curr) => !curr)}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          {showContent ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
              onClick={() => toggleShowContents((curr) => !curr)}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
              onClick={() => toggleShowContents((curr) => !curr)}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </span>
      </span>

      {each_resource.content.map((each_resource_content) => {
        return (
          <span
            className={
              "flex gap-2 m-2 text-slate-500 italic " +
              (showContent ? "" : "hidden")
            }
          >
            <span className="p-[2px] bg-slate-600 rounded-sm"></span>
            <span className=" text-sm ">{each_resource_content}</span>
          </span>
        );
      })}

      {each_resource.contact_list.map((each_resource_contact) => {
        return (
          <span
            className={
              "grid grid-cols-1 my-2 md:grid-cols-2 gap-2 text-xs text-slate-500 font-bold " +
              (showContact ? "" : "hidden")
            }
          >
            <span className="bg-slate-200 rounded-sm p-1">NAME</span>
            <span className="bg-slate-100 rounded-sm p-1">
              {each_resource_contact.name}
            </span>
            <span className="bg-slate-200 rounded-sm p-1">ADDRESS</span>
            <span className="bg-slate-100 rounded-sm p-1">
              {each_resource_contact.address}
            </span>
            <span className="bg-slate-200 rounded-sm p-1">CONTACT</span>
            <span className="bg-slate-100 rounded-sm p-1">
              {each_resource_contact.contact}
            </span>
            <span className="bg-slate-200 rounded-sm p-1">COST</span>
            <span className="bg-slate-100 rounded-sm p-1">
              {each_resource_contact.cost}
            </span>
            <span className="bg-slate-200 rounded-sm p-1">BOARDING</span>
            <span className="bg-slate-100 rounded-sm p-1">
              {each_resource_contact.boarding}
            </span>
            <span className="bg-slate-200 rounded-sm p-1">NOTES</span>
            <span className="bg-slate-100 rounded-sm p-1">
              {each_resource_contact.note}
            </span>
          </span>
        );
      })}
    </div>
  );
}
