import { Link, useNavigate } from "react-router-dom";
import { Fieldset } from "primereact/fieldset";

import { NavigationRoutes } from "../config/navigationRoutes";
import React, { useState } from "react";
import { Avatar } from "primereact/avatar";

import HSBlogo from "../assets/images/hsblogo.svg";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";

type dataItem = { title: string; path: string };
export default function NavComponent() {
  const navigate = useNavigate();

  const buttonClasses =
    "p-3 rounded-md font-bold text-md hover:text-slate-800 transition-all cursor-pointer visited:bg-red-700";

  const menuItemsData: dataItem[] = [
    {
      path: NavigationRoutes.homePath,
      title: "Home",
    },
    {
      path: NavigationRoutes.humanResourcesPath,
      title: "Human Resources",
    },
    {
      path: NavigationRoutes.expensesPath,
      title: "Expenses",
    },
    {
      path: NavigationRoutes.fixedAssetsPath,
      title: "Assets",
    },
  ];

  function navigateTo(path: string) {
    navigate(path);
  }
  const [navValue, setNavValue] = useState(menuOptions()[0]);

  function menuOptions(): React.ReactNode[] {
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
    return nodes || [];
  }

  const navOptions = menuOptions();
  console.log(navOptions);
  return (
    <nav className="pt-1 w-full px-1">
      <Fieldset className="bg-level-1 bg-level-3">
        <section className="flex justify-between w-full items-center">
          {/* left side */}
          <div className="w-3/12 h-full rounded-md flex justify-between">
            <Link
              to={NavigationRoutes.homePath}
              className="w-2/5 p-4 rounded-md bg-level-1"
            >
              <img src={HSBlogo} className="w-full h-full object-center" />
            </Link>
            <h1 className="w-3/5 text-lg flex justify-end items-center font-bold">
              {"INVENTORY SYSTEM"}
            </h1>
          </div>
          {/* mid side */}
          <div className="w-6/12 flex justify-evenly">
            {menuOptions()}
            {/* <SelectButton value={navValue} options={navOptions as string[]} /> */}
          </div>
          {/* right side */}
          <div className="w-3/12 flex justify-end items-center">
            <Avatar
              label="S"
              shape="circle"
              size="large"
              className="relative w-3/5"
            />
            <Link
              to={NavigationRoutes.login}
              className="flex w-1/4 items-center justify-center font-bold color-link hover:underline"
            >
              <span>Log Out</span>
            </Link>
          </div>
        </section>
      </Fieldset>
    </nav>
  );
}
