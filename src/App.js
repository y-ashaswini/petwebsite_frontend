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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Aboutus from "./Components/Aboutus";
import Resources from "./Components/Resources";
import Contribute from "./Components/Contribute";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_API_ANON_KEY
);

export default function App() {
  const location = useLocation();
  const toast_param = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const [u_role, set_u_role] = useState("");
  const [u_email, set_u_email] = useState("");
  const [u_last_signin, set_u_last_signin] = useState("");
  const [communityData, setCommunityData] = useState("");
  const [allPosts, setallPosts] = useState([]);

  useEffect(() => {
    const getUserinfo = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user != null) {
        set_u_role(user.role);
        set_u_email(user.email);
        set_u_last_signin(user.last_sign_in_at);
      }
    };

    const getCommunities = async () => {
      let { data, error } = await supabase.from("community").select("*");
      error ? toast.info(error, toast_param) : setCommunityData(data);
    };

    // const tempf = async () => {
    //   let { tempdata, error } = await supabase.from("post").select("*");
    //   console.log("tempdata: ", tempdata);
    // };

    // const getAllPosts = async () => {
    //   communityData.forEach(async (eachcommunity) => {
    //     let { postsdata, err } = await supabase
    //       .from("post")
    //       .select("*")
    //       .eq("created_in_community_id", eachcommunity.id);
    //     console.log(eachcommunity.name, postsdata);
    //     if (err) {
    //       toast.info(err, toast_param);
    //     } else {
    //       let temp = { name: eachcommunity.name, posts: postsdata };
    //       setallPosts((curr) => [...curr, temp]);
    //     }
    //   });
    // };

    getUserinfo();
    getCommunities();
    // getAllPosts();
    // tempf();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="font-bold text-slate-600 rounded-lg"
      />
      <div className="h-[100vh] bg-slate-100 overflow-y-scroll">
        <Navbar
          u_role={u_role}
          u_email={u_email}
          u_last_signin={u_last_signin}
        />
        <div className="grid grid-cols-8">
          <div className="col-start-1 col-span-3 lg:col-span-2 hidden md:block ">
            <Panel data={communityData} />
          </div>
          <div className="lg:col-start-3 md:col-start-4 col-start-2 col-span-6 xl:px-48 lg:px-24 xl:py-12 sm:p-8">
            <Routes location={location} key={location.pathname}>
              <Route path="/signin" exact element={<Signin />} />
              <Route path="/signup" exact element={<Signup />} />
              <Route path="/" exact element={<Home />} />
              <Route path="/createpost" exact element={<Createpost />} />
              <Route path="/contact" exact element={<Contactus />} />
              <Route path="/about" exact element={<Aboutus />} />
              <Route path="/resources" exact element={<Resources />} />
              <Route path="/resources/contribute" exact element={<Contribute />} />
              <Route path="/*" exact element={<Dump />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
