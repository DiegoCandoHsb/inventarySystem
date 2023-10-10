import { AxiosError } from "axios";
import { useEffect } from "react";
import { Link, useNavigate, useRouteError } from "react-router-dom";
import { NavigationRoutes } from "../config/navigationRoutes";
import { Button } from "primereact/button";

interface errorElements extends AxiosError {
  data: string;
  status: number;
  statusText: string;
}

export default function NotFoundPage() {
  const error = useRouteError() as errorElements;
  const errorCode = error.response?.status;
  console.log(error);
  useEffect(() => {
    if (errorCode === 401) {
      return navigate("/");
    }
    return;
  }, []);

  const navigate = useNavigate();
  function renderError() {
    return (
      <section className="flex flex-col h-screen justify-center items-center bg-gray-100">
        <div className="flex flex-col items-center">
          <h1 className="text-[120px] font-extrabold text-gray-700">
            {error.status ?? 500}
          </h1>
          <p className="text-2xl font-medium text-gray-600 mb-6">
            {`${error.status ? "Page ": ""}`.concat(error.statusText || 'Internal Server Error')}
          </p>
          <Button>
            <Link
              to={NavigationRoutes.basePath}
              className="font-medium text-white transition-all duration-200 ease-in-out"
            >
              Go Home
            </Link>
          </Button>
        </div>
      </section>
      // </div>
    );
  }

  return <>{renderError()}</>;
}
