import { Outlet, useNavigation } from "react-router-dom";
import NavComponent from "../components/NavComponent";
import { useState } from "react";
import LoadSpinner from "../components/LoadSpinner";

export default function Layaout() {
  const [turnSpinner, setTurnSpinner] = useState<boolean>(false);

  return (
    <div className="bg-level-3 min-h-screen h-fit py-1">
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
