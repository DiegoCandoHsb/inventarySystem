import React, { useEffect, useState } from "react";
import { userSignUpData } from "../../interfaces/userSignUpData.interface";
import { AssetActive } from "../../interfaces/enums/assetActive";

interface InputComponentProps {
  name: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  placeholder: string;
  type: string;
  value: string | number;
  mapOptions?: () => Promise<userSignUpData[] | undefined>;
  enumOptions?: typeof AssetActive;
}

export default function InputComponent({
  onChange,
  children,
  name,
  mapOptions,
  enumOptions,
  ...tagInputProperties
}: InputComponentProps & React.PropsWithChildren) {
  const [options, setOptions] = useState<userSignUpData[]>();

  useEffect(() => {
    if (mapOptions) {
      mapOptions()
        .then((res) => {
          setOptions(res);
        })
        .catch((err) => console.log(err));
    }
    return;
  }, []);

  return (
    <>
      <div className="w-full flex flex-col my-1 h-1/2">
        <label htmlFor={name} className="text-lg font-semibold">
          {children}
        </label>
        {tagInputProperties.type === "select" ? (
          <select
            className="border-2 border-slate-600 rounded-md p-1 px-2 outline-none focus:border-slate-900"
            name={name}
            onChange={onChange}
            id={name}
            {...tagInputProperties}
          >
            <option value=""></option>
            {options &&
              options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name.concat(" ", option.details.lastname)}
                </option>
              ))}

              {
                enumOptions && Object.values(enumOptions).map(enumName => (
                  <option key={enumName} value={enumName}>{enumName}</option>
                ))
              }
          </select>
        ) : (
          <input
            className="border-2 border-slate-600 rounded-md p-1 px-2 outline-none focus:border-slate-900"
            name={name}
            id={name}
            {...tagInputProperties}
            onChange={onChange}
          />
        )}
      </div>
    </>
  );
}
