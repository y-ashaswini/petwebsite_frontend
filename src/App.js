import { Route, Routes, useLocation } from "react-router-dom";
import Signin from "./Authentication/Signin";
import Signup from "./Authentication/Signup";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import { createClient } from "@supabase/supabase-js";
import Panel from "./Components/Panel";
import Createpost from "./Components/Createpost";
import Contactus from "./Components/Mailus";
import Dump from "./Components/Dump";
import { useState, useEffect } from "react";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_API_ANON_KEY
);

export default function App() {
  const location = useLocation();
  console.clear();

  const [u_role, set_u_role] = useState("");
  const [u_email, set_u_email] = useState("");
  const [u_last_signin, set_u_last_signin] = useState("");

  useEffect(() => {
    const getUserinfo = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // console.log(user);
      if (user != null) {
        set_u_role(user.role);
        set_u_email(user.email);
        set_u_last_signin(user.last_sign_in_at);
      }
    };

    getUserinfo();
  }, []);

  return (
    <div className="h-[100vh] bg-slate-100 overflow-y-scroll">
      <Navbar u_role={u_role} u_email={u_email} u_last_signin={u_last_signin} />
      <div className="grid grid-cols-8">
        <div className="col-start-1 col-span-3 lg:col-span-2 hidden md:block">
          <Panel />
        </div>
        <div className="lg:col-start-3 md:col-start-4 col-start-2 col-span-6 xl:px-48 lg:px-24 xl:py-12 sm:p-8">
          <Routes location={location} key={location.pathname}>
            <Route path="/signin" exact element={<Signin />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/" exact element={<Home />} />
            <Route path="/createpost" exact element={<Createpost />} />
            <Route path="/contact" exact element={<Contactus />} />
            <Route path="/*" exact element={<Dump />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}
