import { Route, Routes, useLocation } from "react-router-dom";
import Signin from "./Authentication/Signin";
import Signup from "./Authentication/Signup";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import { createClient } from "@supabase/supabase-js";
import Panel from "./Components/Panel";
import Contactus from "./Components/Contactus";
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
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    async function getUserdbdata(userdata) {
      set_u_email(userdata.user.email);
      set_u_uuid(userdata.user.id);
      set_u_ph(userdata.user.phone);

      let { data: userDet, userdberror } = await supabase
        .from("user")
        .select("id,username,is_admin")
        .eq("user_uuid", userdata.user.id);
      if (userdberror) console.log("user db error: ", userdberror);
      else {
        return userDet[0];
      }
    }

    async function getUserinfo() {
      const { data: userdata } = await supabase.auth.getUser();
      if (userdata) {
        const userdbdata = await getUserdbdata(userdata);
        // console.log("userdbdata: ", userdbdata);
        set_u_id(userdbdata.id);
        set_u_name(userdbdata.username);
        set_u_role(userdbdata.is_admin);
        // }
      } else {
        console.log("auth user error");
      }
    }

    getUserinfo();
  }, [set_u_email]);

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
      <div className="h-[100vh] bg-peach2 max-h-[100vh] overflow-y-scroll md:p-0 px-2">
        <Navbar />
        <div className="grid grid-cols-8 min-h-screen gap-2 md:gap-0">
          <div
            className={
              u_email
                ? "md:col-span-3 lg:col-span-2 sm:col-span-3 col-span-8"
                : "hidden"
            }
          >
            <Panel showPanel={showPanel} setShowPanel={setShowPanel} />
          </div>
          <div
            className={
              "xl:px-48 lg:px-24 xl:py-12 sm:p-8 h-full " +
              (u_email
                ? "lg:col-start-3 col-span-8 sm:col-start-4 sm:col-span-6"
                : "col-span-8")
            }
          >
            <Routes location={location} key={location.pathname}>
              <Route
                path="/signin"
                exact
                element={<Signin setShowPanel={setShowPanel} />}
              />
              <Route
                path="/signup"
                exact
                element={<Signup setShowPanel={setShowPanel} />}
              />
              <Route
                path="/"
                exact
                element={<Home setShowPanel={setShowPanel} />}
              />

              <Route
                path="/contact"
                exact
                element={<Contactus setShowPanel={setShowPanel} />}
              />
              <Route
                path="/about"
                exact
                element={<Aboutus setShowPanel={setShowPanel} />}
              />
              <Route
                path="/resources"
                exact
                element={<Resources setShowPanel={setShowPanel} />}
              />
              <Route
                path="/resources/contribute"
                exact
                element={<Contribute setShowPanel={setShowPanel} />}
              />
              <Route
                path="/community/*"
                exact
                element={<CommunityExpanded setShowPanel={setShowPanel} />}
              />
              <Route
                path="/*"
                exact
                element={<Dump setShowPanel={setShowPanel} />}
              />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </userDataContext.Provider>
  );
}
