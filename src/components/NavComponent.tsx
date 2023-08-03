import { Link, useNavigate } from "react-router-dom";
import { Fieldset } from "primereact/fieldset";

import { NavigationRoutes } from "../config/navigationRoutes";
import React from "react";
import { Avatar } from "primereact/avatar";

import HSBlogo from "../assets/images/hsblogo.svg";

type dataItem = { title: string; path: string };
export default function NavComponent() {
  const navigate = useNavigate();

  const buttonClasses =
    "p-3 m-0 rounded-md font-bold text-md hover:text-slate-800 transition-all cursor-pointer";

  const menuItemsData: dataItem[] = [
    {
      path: NavigationRoutes.homePath,
      title: "Home",
    },
    {
      path: NavigationRoutes.expensesPath,
      title: "Expenses",
    },
    // {
    //   path: NavigationRoutes.elecEquiPath,
    //   title: "Electronic Equipment",
    // },
    // {
    //   path: NavigationRoutes.furnAndMixPath,
    //   title: "Furniture and Fixtures",
    // },
    {
      path: NavigationRoutes.fixedAssetsPath,
      title: "Assets",
    },
    {
      path: NavigationRoutes.login,
      title: "Login",
    },
    {
      path: NavigationRoutes.register,
      title: "Register",
    },
  ];

  function navigateTo(path: string) {
    navigate(path);
  }

  function menuOptions(): React.ReactNode {
    const nodes = menuItemsData.map((itemData) => {
      const { path, title } = itemData;
      const button = React.createElement(
        "button",
        { key: title },
        <Link to={path} className={buttonClasses}>
          {title}
        </Link>
      );
      return button;
    });
    return nodes;
  }

  return (
    <nav className="m-1 z-10 w-full">
      <Fieldset>
        <section className="flex justify-between w-full items-center">
          {/* left side */}
          <Link
            to={NavigationRoutes.homePath}
            className="w-3/12 h-full p-3 rounded-md flex justify-center"
          >
            <div className="w-1/2">
              <img src={HSBlogo} className="w-full h-full object-center" />
            </div>
          </Link>
          {/* mid side */}
          <div className="w-6/12 flex justify-evenly">{menuOptions()}</div>
          {/* right side */}
          <div className="w-3/12 flex justify-end">
            <Avatar
              label="S"
              shape="circle"
              size="large"
              className="relative"
            />
          </div>
        </section>
      </Fieldset>
    </nav>
  );
}
