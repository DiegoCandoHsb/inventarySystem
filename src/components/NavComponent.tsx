import { Link, useNavigate } from "react-router-dom";
import { Fieldset } from "primereact/fieldset";

import { NavigationRoutes } from "../config/navigationRoutes";
import React from "react";
import { Avatar } from "primereact/avatar";

type dataItem = { title: string; path: string };
export default function NavComponent() {
  const navigate = useNavigate();

  const buttonClasses =
    "p-2 m-0 rounded-md font-bold text-md hover:text-slate-800 transition-all cursor-pointer";

  const menuItemsData: dataItem[] = [
    {
      path: NavigationRoutes.homePath,
      title: "Home",
    },
    {
      path: NavigationRoutes.expensesPath,
      title: "Expenses",
    },
    {
      path: NavigationRoutes.elecEquiPath,
      title: "Electronic Equipment",
    },
    {
      path: NavigationRoutes.furnAndMixPath,
      title: "Furniture and Mixtures",
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
        "a",
        {
          key: title,
          className: buttonClasses,
        },
        <Link to={path}>{title}</Link>
      );
      return button;
    });
    return nodes;
  }

  return (
    <nav className="fixed m-1 z-10">
      <Fieldset>
        <section className="flex justify-between w-full items-center">
          <Link to={NavigationRoutes.homePath} className="w-1/12 h-full">
            <img
              src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c51f.png"
              className="w-full h-full object-center"
            />
          </Link>
          <div className="w-7/12 flex justify-evenly">{menuOptions()}</div>
          <div className="w-2/12 flex justify-end">
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
