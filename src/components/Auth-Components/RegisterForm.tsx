import { Panel } from "primereact/panel";
import { Form } from "react-router-dom";

interface RegisterFormProps {
  title: string;
  authMethod: () => void | Promise<any>;
}

const RegisterForm = ({
  children,
  title,
  authMethod,
}: React.PropsWithChildren & RegisterFormProps) => {
  return (
    <Panel className="rounded-md w-2/6 min-w-min my-3 h-auto bg-level-3">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          void authMethod();
        }}
      >
        <h1 className="text-3xl font-bold text-center">{title}</h1>
        {children}
      </Form>
    </Panel>
  );
};

export default RegisterForm;
