import { useState, useContext } from "react";
import Action from "./Action";
import { ReactComponent as DownArrow } from "../Assets/down-arrow.svg";
import { ReactComponent as UpArrow } from "../Assets/up-arrow.svg";
import { userDataContext } from "../App";

// HOW TO SET COMMENT ID OF CURRENT POST = 1?

const Comment = ({
  handleInsertNode,
  handleDeleteNode,
  comment,
  comm_name,
  comm_user,
}) => {
  const { u_id, u_name } = useContext(userDataContext);
  const [input, setInput] = useState("");
  const [attachment, setAttachment] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(true);

  // Function for image attaching and previewing
  function handleAttachimg(e) {
    const img = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.addEventListener("load", () => {
      setAttachment([...attachment, reader.result]);
    });
  }

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddComment = () => {
    setExpand(true);
    handleInsertNode(comment.id, input);
    setShowInput(false);
    setInput("");
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };

  return (
    <div>
      <div
        className={
          comment.id === 1
            ? "flex gap-2 my-2 items-center flex-col"
            : "border-l-2 my-2 pl-2 border-slate-200 flex flex-col gap-2"
        }
      >
        {comment.id === 1 ? (
          <>
            <form className="text-sm flex gap-2 w-full items-center">
              <span className="flex items-center gap-2 text-xs font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 bg-slate-200 rounded-full p-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                <span className="bg-slate-200 px-2 py-1 rounded-sm">
                  {u_name}
                </span>
              </span>
              <input
                type="text"
                placeholder="Comment Here"
                className="bg-slate-100 break-words outline-none rounded-sm px-2 py-1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              <label for="input-file">
                <input
                  type="file"
                  id="input-file"
                  className="hidden"
                  onChange={(e) => handleAttachimg(e)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 cursor-pointer hover:bg-slate-100 p-1 rounded-md"
                  for="input-file"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                  />
                </svg>
              </label>
              <Action type="COMMENT" handleClick={onAddComment} />
            </form>
            <span className="flex flex-wrap gap-2">
              {attachment &&
                attachment.map((each) => (
                  <img
                    className="rounded-lg max-h-[16vh] w-fit my-2"
                    src={each}
                  />
                ))}
            </span>
          </>
        ) : (
          <>
            <span className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 bg-slate-200 rounded-full p-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <span className="bg-slate-200 px-2 py-1 rounded-sm text-xs font-bold">
                {comm_user}
              </span>
            </span>
            <span className="flex text-sm gap-2 items-center justify-between px-2 py-1">
              {comment.name}

              <span className="flex gap-2 items-center">
                <Action
                  type={
                    <span className="flex items-center gap-1">
                      {expand ? (
                        <UpArrow width="10px" height="10px" />
                      ) : (
                        <DownArrow width="10px" height="10px" />
                      )}
                      REPLY
                    </span>
                  }
                  handleClick={handleNewComment}
                />

                <Action type="DELETE" handleClick={handleDelete} />
              </span>
            </span>
            <span className="flex flex-wrap gap-2">
              {comment.attachment &&
                comment.attachment.map((each) => (
                  <img
                    className="rounded-lg max-h-[16vh] w-fit my-2"
                    src={each}
                  />
                ))}
            </span>
          </>
        )}
      </div>

      <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
        {showInput && (
          <div className="my-2 pl-2 border-l-2 flex flex-col gap-2 border-slate-600">
            <span className="flex items-center gap-2 text-xs font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 bg-slate-200 rounded-full p-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <span className="bg-slate-200 px-2 py-1 rounded-sm">
                {u_name}
              </span>
            </span>
            <form className="text-sm flex gap-2 w-full items-center flex-1">
              <input
                type="text"
                placeholder="Comment Here"
                className="bg-slate-100 break-words outline-none rounded-sm px-2 py-1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <label for="input-file">
                <input
                  type="file"
                  id="input-file"
                  className="hidden"
                  onChange={(e) => handleAttachimg(e)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 cursor-pointer hover:bg-slate-100 p-1 rounded-md"
                  for="input-file"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                  />
                </svg>
              </label>
              <Action type="REPLY" handleClick={onAddComment} />
              <Action
                type="CANCEL"
                handleClick={() => {
                  setShowInput(false);
                  if (!comment?.items?.length) setExpand(false);
                }}
              />
            </form>
            <span className="flex flex-wrap gap-2">
              {attachment &&
                attachment.map((each) => (
                  <img
                    className="rounded-lg max-h-[16vh] w-fit my-2"
                    src={each}
                  />
                ))}
            </span>
          </div>
        )}

        {comment?.items?.map((cmnt) => {
          return (
            <Comment
              key={cmnt.id}
              handleInsertNode={handleInsertNode}
              handleDeleteNode={handleDeleteNode}
              comment={cmnt}
              comm_name={comm_name}
              comm_user={comm_user}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
