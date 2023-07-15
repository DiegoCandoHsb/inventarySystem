import { createBrowserRouter, redirect } from "react-router-dom";
import Layaout from "../common/Layaout";
// import Register from "../pages/auth/Register";
// import Login, { loginLoader } from "../pages/auth/Login";
import NotFoundPage from "../common/NotFoundPage";
import Activities, { ActivitiesLoader } from "../pages/Activities";
import AuthLayaout from "../common/AuthLayaout";
import App from "../App";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layaout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        loader: ActivitiesLoader,
        element: <Activities />,
      },
      {
        path: "/test",
        element: <App />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayaout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        loader: () => {
          return redirect("/auth/login");
        },
      },
      {
        path: "/auth/login",
        loader: () =>
          import("../pages/auth/Login").then((component) =>
            component.default()
          ),
        lazy: () => import("../pages/auth/Login"),
      },
      {
        path: "/auth/register",
        loader: () =>
          import("../pages/auth/Login").then((component) =>
            component.default()
          ),
        lazy: () => import("../pages/auth/Register"),
      },
    ],
  },
]);
