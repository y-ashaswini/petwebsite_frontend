import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Authentication/Loading";
import Error from "../Authentication/Error";

export default function Navbar() {
  const { isAuthenticated, isLoading, error, user } = useAuth0();
  if (isAuthenticated) {
    return <div>Profile Page shows here : user {user.name}</div>;
  } else if (isLoading) {
    return <Loading />;
  } else if (error) {
    return <Error />;
  }
  return (
    <div className="border md:rounded-md rounded-sm bg-slate-200 w-[20vw] text-center items-center">
      Signed out
    </div>
  );
}
