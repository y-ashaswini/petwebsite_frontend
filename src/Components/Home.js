// import { useEffect, useState } from "react";
import Post from "./Post";
export default function Home({ allPosts }) {
  // const [GeneralData, setGeneralData] = useState("");
  // console.log(allPosts);
  // useEffect(() => {
  //   allPosts.forEach((element) => {
  //     if (element.name === "General") {
  //       setGeneralData(element.posts);
  //     }
  //   });
  //   console.log(GeneralData);
  // }, []);

  return (
    <div className="flex flex-col space-y-12">
      <Post/>
      <Post/>
      <Post/>
    </div>
  );
}

// xl:px-48 lg:px-24 xl:py-8 p-2
