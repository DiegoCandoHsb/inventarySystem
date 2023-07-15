import { useState } from "react";
import ActivitiesCardcomponent from "../components/ActivitiesCardComponent";
import { redirect } from "react-router-dom";

interface ActivitiesMenuOptions {
  img: string;
  title: string;
  navigateTo: string;
}

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
      navigateTo: "/",
    },
    {
      img: "https://www.petlife.mx/u/fotografias/m/2023/5/16/f768x1-2048_2175_5050.jpg",
      title: "Fixed Assets",
      navigateTo: "/",
    },
    {
      img: "https://img.playbuzz.com/image/upload/ar_1.5,c_pad,f_jpg,b_auto/q_auto:good,f_auto,fl_lossy,w_480,c_limit,dpr_1/cdn/dc0566b2-2749-4ebf-831a-360461863b1f/d25de7b8-da5e-4835-a593-4154357d7b4d_560_420.jpg",
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

  if (!token) return redirect("/auth/login");

  return token;
}
