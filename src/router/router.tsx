import { createBrowserRouter, redirect } from "react-router-dom";
import Layaout from "../common/Layaout";
import NotFoundPage from "../common/NotFoundPage";
import Activities from "../pages/Activities";
import AuthLayaout from "../common/AuthLayaout";
import FixedAssetsMenu from "../pages/fixedAssets/FixedAssetsMenu";
import { NavigationRoutes } from "../config/navigationRoutes";

import { AssetDataLoader } from "../common/loaders/AssetsLoader";
import HumanResources, {
  HumanResourcesLoader,
} from "../pages/humanResources/HumanResources";
import FurnitureAndFixtures from "../pages/fixedAssets/FurnitureAndFixtures";
import ElectronicEquipment from "../pages/fixedAssets/ElectronicEquipment";
import Expenses from "../pages/expenses/expenses";
import TokenLoader from "../common/loaders/TokenLoader";
import { PathProtectedLoader } from "../common/loaders/ProtectedPathLoader";

export const routes = createBrowserRouter([
  {
    path: NavigationRoutes.basePath,
    element: <Layaout />,
    // loader: PathProtectedLoader,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        loader: PathProtectedLoader,
        element: <Activities />,
      },
      {
        path: NavigationRoutes.expensesPath,
        loader: AssetDataLoader,
        element: <Expenses />,
      },
      {
        path: NavigationRoutes.humanResourcesPath,
        loader: HumanResourcesLoader,
        element: <HumanResources />,
      },
      {
        path: NavigationRoutes.fixedAssetsPath,
        loader: PathProtectedLoader,
        children: [
          {
            index: true,
            element: <FixedAssetsMenu />,
          },
          {
            path: NavigationRoutes.elecEquiPath,
            loader: AssetDataLoader,
            element: <ElectronicEquipment />,
          },
          {
            path: NavigationRoutes.furnAndMixPath,
            loader: AssetDataLoader,
            element: <FurnitureAndFixtures />,
          },
        ],
      },
    ],
  },

  {
    path: NavigationRoutes.authBasePath,
    element: <AuthLayaout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        loader: () => {
          console.log(NavigationRoutes.register);
          return redirect(NavigationRoutes.login);
        },
      },
      {
        path: NavigationRoutes.login,
        loader: TokenLoader,
        lazy: () => import("../pages/auth/Login"),
      },
      {
        path: NavigationRoutes.register,
        loader: TokenLoader,
        lazy: () => import("../pages/auth/Register"),
      },
    ],
  },
]);
