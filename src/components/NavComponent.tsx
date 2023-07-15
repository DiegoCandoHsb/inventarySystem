import { Link } from "react-router-dom";

export default function NavComponent() {
  return (
    <div className="w-full">
      <ul className="w-1/2 flex justify-evenly mx-auto">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/test"}>Test</Link>
        </li>
        <li>
          <Link to={"/auth/register"}>Register</Link>
        </li>
        <li>
          <Link to={"/auth/login"}>login</Link>
        </li>
      </ul>
    </div>
  );
}
