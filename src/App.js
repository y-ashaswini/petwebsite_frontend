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
import { ToastContainer, toast } from "react-toastify";
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

  useEffect(() => {
    const getUserinfo = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user != null) {
        set_u_role(user.role);
        set_u_email(user.email);

        let { data, error } = await supabase.from("user").select("*");
        if (error) console.log("error: ", error);
        else {
          set_u_name(data[0].username);
          set_u_ph(data[0].phone);
          set_u_id(data[0].id);
        }
      }
    };

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
