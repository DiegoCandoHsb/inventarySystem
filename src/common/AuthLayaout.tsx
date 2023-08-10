import { ProgressSpinner } from "primereact/progressspinner";

import { Outlet, useNavigation } from "react-router-dom";

export default function AuthLayaout() {
  const { state } = useNavigation();

  return (
    <div className="bg-level-3">
      {state === "loading" ? (
        <div className="w-full h-96 flex justify-center content-center items-center">
          <ProgressSpinner />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
