import { userDataContext } from "../App";
import { useEffect, useState, useContext } from "react";
import Community from "./Community";

const supabase_anon_key = process.env.REACT_APP_SUPABASE_API_ANON_KEY;
const supabase_url = process.env.REACT_APP_SUPABASE_URL;

export default function Panel({ showPanel, setShowPanel }) {
  const { u_email } = useContext(userDataContext);
  const [commData, setCommData] = useState("");

  useEffect(() => {
    fetch(supabase_url + "/graphql/v1", {
      method: "POST",

      headers: {
        apikey: supabase_anon_key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
              query GetCommunities {
               communityCollection {
                edges {
                  node {
                    id
                    name
                    description
                    city_in_id
                  }
                }
               }
              }
            `,
      }),
    })
      .then((res) => res.json())
      .then((result) => setCommData(result.data.communityCollection.edges));
    setShowPanel(true);
  }, []);

  return (
    <>
      <div
        className={
          "bg-blue1 text-white cursor-pointer text-xs md:text-sm font-bold px-2 py-1 sticky sm:hidden rounded-sm text-center m-2" +
          (!u_email && " hidden")
        }
        onClick={() => setShowPanel((curr) => !curr)}
      >
        {showPanel ? "HIDE" : "SHOW"} COMMUNITIES
      </div>
      {u_email && u_email.trim() !== "" ? (
        <div
          className={
            "flex flex-col gap-2 text-blue1 space-y-4 p-4 w-auto sticky top-10 h-[90vh] overflow-y-scroll scrollbar-thumb-blue1 scrollbar-thumb-rounded-2xl scrollbar-track-peach2 scrollbar-thin text-center " +
            (showPanel ? "" : "hidden sm:flex")
          }
        >
          {commData &&
            commData.map((each) => (
              <Community
                key={each.node.id}
                name={each.node.name}
                id={each.node.id}
                description={each.node.description}
                showPanel={showPanel}
                setShowPanel={setShowPanel}
              />
            ))}
        </div>
      ) : (
        <div className="bg-peach1 overflow-y-scroll w-full"></div>
      )}
    </>
  );
}
