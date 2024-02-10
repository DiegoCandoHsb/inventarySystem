import { useState } from "react";
import ActivitiesCardcomponent from "../components/ActivitiesCardComponent";
import { ActivitiesMenuOptions } from "../interfaces/activitiesMenus.interface";
import { NavigationRoutes } from "../config/navigationRoutes";

export default function Activities() {
  const iconStyles: React.CSSProperties = {
    fontSize: "12rem",
    textAlign: "center",
  };

  const [activitiesMenuOptions] = useState<ActivitiesMenuOptions[]>([
    {
      icon: <i className="pi pi-users" style={iconStyles}></i>,
      title: "Human Resources",
      navigateTo: NavigationRoutes.humanResourcesPath,
    },
    {
      icon: <i className="pi pi-list" style={iconStyles}></i>,
      title: "Fixed Assets",
      navigateTo: NavigationRoutes.fixedAssetsPath,
    },
    {
      icon: <i className="pi pi-file" style={iconStyles}></i>,
      title: "Electronic Docs",
      navigateTo: NavigationRoutes.homePath,
    },
  ]);

  return (
    <section className="w-full my-10">
      <ul className="w-full z-1 flex flex-row mx-auto justify-center items-center">
        {activitiesMenuOptions.map((activitie) => (
          <ActivitiesCardcomponent
            key={activitie.title}
            icon={activitie.icon}
            title={activitie.title}
            navigateTo={activitie.navigateTo}
          />
        ))}
      </ul>
    </section>
  );
}
