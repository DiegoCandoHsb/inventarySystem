import { Link, useRouteError } from "react-router-dom";

interface errorElements {
  data: string;
  status: number;
  statusText: string;
}

export default function NotFoundPage() {
  const error = useRouteError() as errorElements;

  console.log(error);

  return (
    <div className="align-center items-center  h-screen text-center text-4xl font-bold flex flex-col justify-center">
      <h1>{error.status}</h1>
      <h1>{error.statusText}</h1>
      <h1>{error.data}</h1>
      <Link to={"/"} className="bg-blue-600">Go to Home</Link>
    </div>
  );
}
