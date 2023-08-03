import { Panel } from "primereact/panel";

interface RegisterFormProps {
  title: string;
}

const RegisterForm = ({
  children,
  title,
}: React.PropsWithChildren & RegisterFormProps) => {
  return (
    <Panel className="rounded-md w-2/6 min-w-min my-3 h-auto border-2  shadow-md bg-slate-200 ">
      <h1 className="text-3xl font-bold text-center">{title}</h1>
      {children}
    </Panel>
  );
};

export default RegisterForm;
