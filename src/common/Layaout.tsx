import { Outlet, useNavigation } from "react-router-dom";
import NavComponent from "../components/NavComponent";

export default function Layaout() {
  const { state } = useNavigation();
  return (
    <div>
      <nav>
        <NavComponent />
      </nav>
      {state === "loading" ? <h1>Loading...</h1> : <Outlet />}
      <footer>footer xd</footer>
    </div>
  );
}
