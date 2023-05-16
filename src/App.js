import { Route, Routes, useLocation } from "react-router-dom";
import Signin from "./Authentication/Signin";
import Signup from "./Authentication/Signup";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import { createClient } from "@supabase/supabase-js";
import Panel from "./Components/Panel";
import Contactus from "./Components/Mailus";
import Dump from "./Components/Dump";
import { useState, useEffect, createContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import Aboutus from "./Components/Aboutus";
import Resources from "./Components/Resources";
import Contribute from "./Components/Contribute";
import CommunityExpanded from "./Components/CommunityExpanded";

export const userDataContext = createContext();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_API_ANON_KEY
);

export default function App() {
  const location = useLocation();

  const [u_role, set_u_role] = useState("");
  const [u_email, set_u_email] = useState("");
  const [u_name, set_u_name] = useState("");
  const [u_ph, set_u_ph] = useState("");
  const [u_id, set_u_id] = useState("");
  const [u_uuid, set_u_uuid] = useState("");

  useEffect(() => {
    async function getUserinfo() {
      const { data: userdata } = await supabase.auth.getUser();
      // console.log(userdata.user.id);
      if (userdata) {
        set_u_role(userdata.user.role);
        set_u_email(userdata.user.email);
        set_u_uuid(userdata.user.id);
        set_u_ph(userdata.user.phone);
        // console.log("user uuid: ", u_uuid);
        let { data: userDet, userdberror } = await supabase
          .from("user")
          .select("id,username");
        // .eq("user_uuid", u_uuid);
        if (userdberror) console.log("user db error: ", userdberror);
        else {
          // console.log("user details from app: ",userDet);
          set_u_id(userDet[0].id);
          set_u_name(userDet[0].username);
        }
      } else {
        console.log("error");
      }
    }

    getUserinfo();
  }, []);

  return (
    <userDataContext.Provider
      value={{
        u_role,
        set_u_role,
        u_email,
        set_u_email,
        u_name,
        set_u_name,
        u_ph,
        set_u_ph,
        u_id,
        set_u_id,
        u_uuid,
        set_u_uuid,
      }}
    >
      <div className="h-[100vh] bg-slate-100 max-h-[100vh] overflow-y-scroll">
        <Navbar />
        <div className="grid grid-cols-8 min-h-screen">
          <div className="col-start-1 col-span-3 lg:col-span-2 hidden md:block ">
            <Panel />
          </div>
          <div className="lg:col-start-3 md:col-start-4 col-start-2 col-span-6 xl:px-48 lg:px-24 xl:py-12 sm:p-8">
            <Routes location={location} key={location.pathname}>
              <Route path="/signin" exact element={<Signin />} />
              <Route path="/signup" exact element={<Signup />} />
              <Route path="/" exact element={<Home />} />
              <Route path="/contact" exact element={<Contactus />} />
              <Route path="/about" exact element={<Aboutus />} />
              <Route path="/resources" exact element={<Resources />} />
              <Route
                path="/resources/contribute"
                exact
                element={<Contribute />}
              />
              <Route
                path="/community/*"
                exact
                element={<CommunityExpanded />}
              />
              <Route path="/*" exact element={<Dump />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </userDataContext.Provider>
  );
}
