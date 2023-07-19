import { useState } from "react";
import ActivitiesCardcomponent from "../../components/ActivitiesCardComponent";
import { ActivitiesMenuOptions } from "../../interfaces/activitiesMenus.interface";
import { Outlet } from "react-router-dom";

export default function FixedAssetsMenu() {
  const [activitiesMenuOptions] = useState<ActivitiesMenuOptions[]>([
    {
      img: "https://i.pinimg.com/550x/09/90/fe/0990fe16f61df266c4fc0923bff98c3b.jpg",
      title: "Electronic Equipment",
      navigateTo: "/fixedAssets/electronicEquipment",
    },
    {
      img: "https://i.pinimg.com/550x/09/90/fe/0990fe16f61df266c4fc0923bff98c3b.jpg",
      title: "Human Resources",
      navigateTo: "/fixedAssets/",
    },
  ]);

  return (
    <section>
      <ul className="flex flex-row w-full h-screen justify-evenly items-center">
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
