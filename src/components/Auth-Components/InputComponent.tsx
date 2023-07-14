interface InputComponentProps {
  title: string;
  name: string;
  placeholder: string;
  inputType: string;
  value: string | number;
  onChangeInput: (value: string, field: any) => void;
}

export default function InputComponent({
  name,
  placeholder,
  inputType,
  title,
  value,
  onChangeInput,
}: InputComponentProps) {
  return (

    <>
      <div className="w-full flex flex-col my-1 h-1/2">
        <label htmlFor={name} className="text-lg font-semibold">
          {title}
        </label>
        <input
          className="border-2 border-slate-600 rounded-md p-1 px-2 outline-none focus:border-slate-900"
          type={inputType}
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={e => onChangeInput(e.target.value, name)}
        />
      </div>
    </>
  );
}
