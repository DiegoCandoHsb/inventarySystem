import { useState } from "react";
import ActivitiesCardcomponent from "../../components/ActivitiesCardComponent";
import { ActivitiesMenuOptions } from "../../interfaces/activitiesMenus.interface";
import { NavigationRoutes } from "../../config/navigationRoutes";

export default function FixedAssetsMenu() {
  const iconStyles: React.CSSProperties = {
    fontSize: "12rem",
    textAlign: "center",
  };

  const [activitiesMenuOptions] = useState<ActivitiesMenuOptions[]>([
    {
      icon: <i className="pi pi-desktop" style={iconStyles}></i>,

      title: "Electronic Equipment",
      navigateTo: NavigationRoutes.elecEquiPath,
    },
    {
      icon: <i className="pi pi-box" style={iconStyles}></i>,
      title: "Furnitures and Fixtures",
      navigateTo: NavigationRoutes.furnAndMixPath,
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
