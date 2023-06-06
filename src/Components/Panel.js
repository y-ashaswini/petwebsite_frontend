import { userDataContext } from "../App";
import { useEffect, useState, useContext } from "react";
import Community from "./Community";

const supabase_anon_key = process.env.REACT_APP_SUPABASE_API_ANON_KEY;
const supabase_url = process.env.REACT_APP_SUPABASE_URL;

export default function Panel({ showPannel, setShowPannel }) {
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
    setShowPannel(true);
  }, []);

  return (
    <>
      <div
        className="bg-blue1 text-white cursor-pointer font-bold px-2 py-1 sticky sm:hidden rounded-sm text-center m-2"
        onClick={() => setShowPannel((curr) => !curr)}
      >
        {showPannel ? "HIDE" : "SHOW"} COMMUNITIES
      </div>
      {u_email && u_email.trim() !== "" ? (
        <div
          className={
            "flex flex-col gap-8 text-blue1 space-y-4 p-4 w-auto sticky top-10 h-[90vh] overflow-y-scroll scrollbar-thumb-blue1 scrollbar-thumb-rounded-2xl scrollbar-track-slate-100 scrollbar-thin text-center " +
            (showPannel ? "" : "hidden sm:flex")
          }
        >
          {commData &&
            commData.map((each) => (
              <Community
                key={each.node.id}
                name={each.node.name}
                id={each.node.id}
                description={each.node.description}
                showPannel={showPannel}
                setShowPannel={setShowPannel}
              />
            ))}
        </div>
      ) : (
        <div className="bg-peach1 overflow-y-scroll w-full"></div>
      )}
    </>
  );
}
