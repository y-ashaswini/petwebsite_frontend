import { userDataContext } from "../App";
import { useEffect, useState, useContext } from "react";
import Community from "./Community";

const supabase_anon_key = process.production.REACT_APP_SUPABASE_API_ANON_KEY;
const supabase_url = process.production.REACT_APP_SUPABASE_URL;

export default function Panel() {
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
  }, []);

  return (u_email && u_email.trim() !== "") ? (
    <div className="flex flex-col gap-8 text-slate-500 space-y-4 p-4 w-auto sticky top-10 h-[90vh] overflow-y-scroll scrollbar-thumb-slate-600 scrollbar-thumb-rounded-2xl scrollbar-track-slate-100 scrollbar-thin text-center">
      {commData &&
        commData.map((each) => (
          <Community
            key={each.node.id}
            name={each.node.name}
            id={each.node.id}
            description={each.node.description}
          />
        ))}
    </div>
  ) : (
    <div className="bg-slate-300 h-full w-full"></div>
  );
}
