import { useEffect, useState } from "react";
import { useContext } from "react";
import { userDataContext } from "../App";
import Post from "./Post";
import NotSignedin from "../Authentication/NotSignedin";
import { createClient } from "@supabase/supabase-js";

const supabase_anon_key = process.env.REACT_APP_SUPABASE_API_ANON_KEY;
const supabase_url = process.env.REACT_APP_SUPABASE_URL;
const supabase = createClient(supabase_url, supabase_anon_key);

export default function Home() {
  const { u_email } = useContext(userDataContext);
  const [generalPostData, setGeneralPostData] = useState("");

  useEffect(() => {
    async function GET_GENERAL_POSTS() {
      // General Posts: id 5
      let { data, error } = await supabase
        .from("post")
        .select("*")
        .eq("created_in_community_id", 5);

      if (error) {
        console.log("error: ", error);
      } else {
        setGeneralPostData(data);
      }
    }

    GET_GENERAL_POSTS();
  }, []);

  return (
    <div className="flex flex-col space-y-12">
      {u_email && u_email.trim() !== "" ? (
        <>
          <div className="md:text-3xl text-lg font-bold text-slate-600">
            The General Community
          </div>
          {generalPostData &&
            generalPostData.map((post) => (
              <Post
                key={post.id}
                title={post.title}
                content={post.content}
                created_by_user_id={post.created_by_user_id}
                created_under_city_id={post.created_under_city_id}
                created_in_community_id={post.created_in_community_id}
              />
            ))}
        </>
      ) : (
        <NotSignedin />
      )}
    </div>
  );
}
