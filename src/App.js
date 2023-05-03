import { Route, Routes, useLocation } from "react-router-dom";
import Init from "./Authentication/Init";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import { Auth0Provider } from "@auth0/auth0-react";
import Panel from "./Components/Panel";
import Createpost from "./Components/Createpost";
import Contactus from "./Components/Mailus";

// const express = require("express");
// const app_express = express();
export default function App() {
  // Defining Routes for Supabase

  // app_express.get("/", (req, res) => {
  //   res.send("hello world");
  // });

  const location = useLocation();
  return (
    <div className="h-[100vh] bg-slate-100 overflow-y-scroll">
      <Auth0Provider>
        <Navbar />
      </Auth0Provider>
      <div className="grid grid-cols-8">
        <div className="col-start-1 col-span-3 lg:col-span-2 hidden md:block">
          <Panel />
        </div>
        <div className="lg:col-start-3 md:col-start-4 col-start-2 col-span-6 xl:px-48 lg:px-24 xl:py-12 sm:p-8">
          <Routes location={location} key={location.pathname}>
            <Route path="/" exact element={<Home />} />
            <Route path="/createpost" exact element={<Createpost />} />
            <Route path="/contact" exact element={<Contactus />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}
