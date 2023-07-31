import { Panel } from "primereact/panel";

interface RegisterFormProps {
  title: string;
}

const RegisterForm = ({
  children,
  title,
}: React.PropsWithChildren & RegisterFormProps) => {
  return (
    <Panel className="rounded-md w-1/4 min-w-min my-3 h-full border-2  shadow-md bg-slate-200 relative left-20">
      <h1 className="text-3xl font-bold text-center">{title}</h1>
      {children}
    </Panel>
  );
};

export default RegisterForm;
