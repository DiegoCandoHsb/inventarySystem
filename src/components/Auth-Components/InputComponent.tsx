import React from "react";

interface InputComponentProps {
  [dataName: InputComponentProps]: string | number;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
  value: string | number;
}

export default function InputComponent({
  onChange,
  children,
  name,
  ...tagInputProperties
}: InputComponentProps & React.PropsWithChildren) {
  return (
    <>
      <div className="w-full flex flex-col my-1 h-1/2">
        <label htmlFor={name} className="text-lg font-semibold">
          {children}
        </label>
        <input
          className="border-2 border-slate-600 rounded-md p-1 px-2 outline-none focus:border-slate-900"
          name={name}
          id={name}
          {...tagInputProperties}
          onInput={onChange}
        />
      </div>
    </>
  );
}
