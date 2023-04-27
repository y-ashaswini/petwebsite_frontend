import Post from "./Post";
export default function Home() {
  return (
    <div className="flex flex-col space-y-12 xl:px-48 lg:px-24 xl:py-8 p-2">
      <Post />
      <Post />
      <Post />
    </div>
  );
}
