import { Link } from "react-router-dom";

interface ActivitiesCardComponentProps {
  title: string;
  img: string;
  navigateTo: string;
}

export default function ActivitiesCardComponent({
  img,
  title,
  navigateTo,
}: ActivitiesCardComponentProps) {
  return (
    <li className="w-2/5 flex flex-col justify-center  border-2 border-slate-600 mx-2 bg-slate-200 rounded-lg h-3/5 hover:scale-[102%] transition-all">
      <Link to={navigateTo} className="text-center w-full h-full flex flex-col justify-center">
        <div className="w-72 h-72 mx-auto">
          <img
            src={img}
            alt={title}
            className="w-full h-full mx-auto bg-red-700"
          />
        </div>
        <span className="text-center mx-auto text-2xl font-semibold mt-2">
          {title}
        </span>
      </Link>
    </li>
  );
}
