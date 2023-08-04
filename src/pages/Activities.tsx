import { useState } from "react";
import ActivitiesCardcomponent from "../components/ActivitiesCardComponent";
import { ActivitiesMenuOptions } from "../interfaces/activitiesMenus.interface";
import DefaultImg from "../assets/images/defaultimg.jpg";
import { NavigationRoutes } from "../config/navigationRoutes";

export default function Activities() {
  const [activitiesMenuOptions] = useState<ActivitiesMenuOptions[]>([
    {
      img: DefaultImg,
      title: "Human Resources",
      navigateTo: NavigationRoutes.humanResourcesPath,
    },
    // {
    //   img: DefaultImg,
    //   title: "Expenses",
    //   navigateTo: NavigationRoutes.expensesPath,
    // },
    {
      img: DefaultImg,
      title: "Fixed Assets",
      navigateTo: NavigationRoutes.fixedAssetsPath,
    },
    {
      img: DefaultImg,
      title: "Electronic Docs",
      navigateTo: NavigationRoutes.homePath,
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

export function ActivitiesLoader() {
  const token = sessionStorage.getItem("token");

  // if (!token) return redirect("/auth/login");

  return token;
}
