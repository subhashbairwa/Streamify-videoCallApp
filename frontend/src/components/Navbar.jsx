// Navbar.jsx
import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-end gap-4">
        {isChatPage && (
          <div className="pl-5">
            <Link to="/" className="flex items-center gap-2.5">
              <ShipWheelIcon className="w-9 h-9 text-primary" />
              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                Streamify
              </span>
            </Link>
          </div>
        )}

        <Link to={"/notifications"}>
          <button className="btn btn-ghost btn-circle">
            <BellIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </Link>

        <ThemeSelector />

        <div className="avatar">
          <div className="w-9 rounded-full">
            <img src={authUser?.profilePic} alt="User Avatar" />
          </div>
        </div>

        <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
          <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
