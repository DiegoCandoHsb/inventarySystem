import { Link } from "react-router-dom";

export interface ActivitiesCardComponentProps {
  title: string;
  img: string;
  navigateTo: string
}

export default function ActivitiesCardComponent({
  img,
  title,
  navigateTo
}: ActivitiesCardComponentProps) {
  return (
    <li className="flex flex-col justify-center border-2 border-slate-600 mx-2 bg-slate-200 rounded-lg h-1/2 hover:scale-[102%] transition-all">
      <Link to={navigateTo} className="text-center">
        <div className="w-3/5 mx-auto p-2">
          <img src={img} alt={title} className="w-screen h-auto" />
        </div>
        <span className="text-center text-2xl font-semibold mt-2">{title}</span>
      </Link>
    </li>
  );
}
