import { Outlet, useNavigation } from "react-router-dom";
import NavComponent from "../components/NavComponent";
import { NavigationRoutes } from "../config/navigationRoutes";
import { useEffect, useState } from "react";
import LoadSpinner from "../components/LoadSpinner";

export default function Layaout() {
  const [turnSpinner, setTurnSpinner] = useState<boolean>(false);

  useEffect(() => {
    // console.log(turnSpinner);
  }, [turnSpinner]);

  return (
    <div className="bg-level-3 h-screen">
      <nav>
        <NavComponent />
      </nav>
      {turnSpinner ? (
        <LoadSpinner />
      ) : (
        <Outlet context={[turnSpinner, setTurnSpinner]} />
      )}
    </div>
  );
}
