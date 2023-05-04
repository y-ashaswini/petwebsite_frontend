import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_API_ANON_KEY
);

export default async function Profile() {
  // const [userinfo, setUserinfo] = useState([]);

  useEffect(() => {
    const getUserinfo = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);
    };

    getUserinfo();
  }, []);

  return (
    <div className="flex items-center py-2 justify-evenly text-slate-600 font-bold px-4">
      <span className="bg-white px-3 py-2 rounded-md">Profile Details</span>
      <span className="border border-slate-600 px-3 py-2 rounded-md">
        useremail
      </span>
      hello
    </div>
  );
}
