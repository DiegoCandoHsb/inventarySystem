import { createBrowserRouter, json, redirect } from "react-router-dom";

import * as reactJWT from "react-jwt";

import { NavigationRoutes } from "../config/navigationRoutes";
import { AssetDataLoader } from "../common/loaders/AssetsLoader";
import HumanResources, {
  HumanResourcesLoader,
} from "../pages/humanResources/HumanResources";
import TokenLoader from "../common/loaders/TokenLoader";
import { conbinedLoaders } from "../common/loaders/CombineLoaders";
import { AssetTypeConfig } from "../config/assets.config";
import FixedAssetsMenu from "../pages/fixedAssets/FixedAssetsMenu";
import NotFoundPage from "../common/NotFoundPage";
import Layaout from "../common/Layaout";
import AuthLayaout from "../common/AuthLayaout";
import Activities from "../pages/Activities";
import FurnitureAndFixtures from "../pages/fixedAssets/FurnitureAndFixtures";
import ElectronicEquipment from "../pages/fixedAssets/ElectronicEquipment";
import Profile from "../pages/auth/Profile";
import { ProfileLoader } from "../common/loaders/ProfileLoader";

export const routes = createBrowserRouter([
  {
    path: NavigationRoutes.basePath,
    element: <Layaout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Activities />,
        loader: () => conbinedLoaders(),
      },
      {
        path: NavigationRoutes.profilePath,
        element: <Profile />,
        loader: () => conbinedLoaders(ProfileLoader),
      },
      {
        path: NavigationRoutes.humanResourcesPath,
        element: <HumanResources />,
        loader: () => conbinedLoaders(HumanResourcesLoader),
      },
      {
        path: NavigationRoutes.fixedAssetsPath,
        children: [
          {
            index: true,
            element: <FixedAssetsMenu />,
            loader: () => conbinedLoaders(),
          },
          {
            path: NavigationRoutes.elecEquiPath,
            element: <ElectronicEquipment />,
            loader: () =>
              conbinedLoaders(() =>
                AssetDataLoader(AssetTypeConfig.ElectronicEquipment)
              ),
          },
          {
            path: NavigationRoutes.furnAndMixPath,
            element: <FurnitureAndFixtures />,
            loader: () =>
              conbinedLoaders(() =>
                AssetDataLoader(AssetTypeConfig.FurnitureAndFixtures)
              ),
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
        lazy: () => import("../pages/auth/Login"),
        loader: TokenLoader,
      },
      {
        path: NavigationRoutes.register,
        lazy: () => import("../pages/auth/Register"),
        loader: TokenLoader,
      },
    ],
  },
]);
