import { Outlet, useNavigation } from "react-router-dom";

export default function AuthLayaout() {
  const { state } = useNavigation();

  return <div>{state === "loading" ? <h1>Loading...</h1> : <Outlet />}</div>;
}
