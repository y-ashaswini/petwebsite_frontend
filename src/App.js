import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import { Auth0Provider } from "@auth0/auth0-react";
import Panel from "./Components/Panel";
import Createpost from "./Components/Createpost";
// import Community from "./Components/Community";
export default function App() {
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
        <div className="lg:col-start-3 md:col-start-4 col-start-2 col-span-6 ">
          <Routes location={location} key={location.pathname}>
            <Route path="/" exact element={<Home />} />
            <Route path="/createpost" exact element={<Createpost />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// absolute top-[50%] grid left-[50%] translate-x-[-50%] translate-y-[-50%]
