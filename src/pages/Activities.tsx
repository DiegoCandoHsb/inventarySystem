import { useState } from "react";
import ActivitiesCardcomponent from "../components/ActivitiesCardComponent";
import { ActivitiesMenuOptions } from "../interfaces/activitiesMenus.interface";

export default function Activities() {
  const [activitiesMenuOptions] = useState<ActivitiesMenuOptions[]>([
    {
      img: "https://i.pinimg.com/550x/09/90/fe/0990fe16f61df266c4fc0923bff98c3b.jpg",
      title: "Human Resources",
      navigateTo: "/",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYDLhIUQpb0KRFPjXYblduUheJFNDE5Ou-dEHR84VjNg&s",
      title: "Expenses",
      navigateTo: "/expenses",
    },
    {
      img: "https://www.petlife.mx/u/fotografias/m/2023/5/16/f768x1-2048_2175_5050.jpg",
      title: "Fixed Assets",
      navigateTo: "/fixedAssets",
    },
    {
      img: "https://1.bp.blogspot.com/-iCnFX7eWVjs/XR9NQutHXcI/AAAAAAAAJ9k/ISWH3UXgJF8QJdsV6P9wh3agzOwOF_aYgCLcBGAs/s1600/cat-1285634_1920.png",
      title: "Electronic Items",
      navigateTo: "/",
    },
  ]);

  return (
    <section>
      <ul className="flex flex-row w-full h-screen items-center">
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
