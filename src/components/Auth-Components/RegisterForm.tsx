interface RegisterFormProps {
  title: string;
}

const RegisterForm = ({
  children,
  title,
}: React.PropsWithChildren & RegisterFormProps) => {
  return (
    <section className="p-3 rounded-md border-2 border-blue-800 w-1/4 min-w-max my-3 h-full bg-slate-400 relative left-20">
      <h1 className="text-3xl font-bold text-center">{title}</h1>
      {children}
    </section>
  );
};

export default RegisterForm;
