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
            img={activitie.img}
            title={activitie.title}
            navigateTo={activitie.navigateTo}
          />
        ))}
      </ul>
    </section>
  );
}
