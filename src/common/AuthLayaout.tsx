import { Outlet, useNavigation } from "react-router-dom";
import { NavigationRoutes } from "../config/navigationRoutes";

export default function AuthLayaout() {
  const { state } = useNavigation();

  return (
    <div className="bg-level-3">
      {state === "loading" &&
      (location.pathname !== NavigationRoutes.basePath ||
        location.pathname !== NavigationRoutes.fixedAssetsPath) ? (
        <div className="w-full h-screen flex justify-center content-center items-center">
          <div className="border-gray-400 h-36 w-36 animate-spin rounded-full spiner-border" />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
