import { Outlet, useNavigation } from "react-router-dom";
import NavComponent from "../components/NavComponent";
import { ProgressSpinner } from "primereact/progressspinner";

export default function Layaout() {
  const { state } = useNavigation();
  return (
    <div className="bg-level-3">
      <nav>
        <NavComponent />
      </nav>
      {state === "loading" ? (
        <div className="w-full h-96 flex justify-center content-center items-center">
          <ProgressSpinner />
        </div>
      ) : (
        <Outlet />
      )}
      <footer>footer xd</footer>
    </div>
  );
}
