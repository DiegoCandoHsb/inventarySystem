import { useState } from "react";
import ActivitiesCardcomponent from "../../components/ActivitiesCardComponent";
import { ActivitiesMenuOptions } from "../../interfaces/activitiesMenus.interface";
import defaultImg from "../../assets/images/defaultimg.jpg";
import { NavigationRoutes } from "../../config/navigationRoutes";

export default function FixedAssetsMenu() {
  const [activitiesMenuOptions] = useState<ActivitiesMenuOptions[]>([
    {
      img: defaultImg,
      title: "Electronic Equipment",
      navigateTo: NavigationRoutes.elecEquiPath,
    },
    {
      img: defaultImg,
      title: "Human Resources",
      navigateTo: NavigationRoutes.furnAndMixPath,
    },
  ]);

  return (
    <section>
      <ul className="w-full h-screen flex flex-row mx-auto justify-center items-start my-10">
        {activitiesMenuOptions.map((activitie) => (
          <ActivitiesCardcomponent
            key={activitie.title}
            img={activitie.img}
            title={activitie.title}
            navigateTo={activitie.navigateTo}
          />
        ))}
      </ul>
    </section>
  );
}
