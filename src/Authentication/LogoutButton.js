import { useAuth0 } from "@auth0/auth0-react";
export default function LogoutButton() {
  const { logout, user, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <span
        onClick={() => logout()}
        className="cursor-pointer flex items-center bg-slate-100 rounded-lg px-3 py-1"
      >
        <img src={user.picture} className="w-6 h-6 rounded-full" />
      </span>
    )
  );
}
