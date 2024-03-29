import React, { useEffect, useState } from "react";
import { userSignUpData } from "../../interfaces/userSignUpData.interface";
import { AssetActive } from "../../interfaces/enums/assetActive";
import { CatalogOption } from "../../interfaces/catalog.interface";
import { AssetTypeConfig } from "../../config/assets.config";
import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";

interface InputComponentProps {
  name: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  placeholder: string;
  type: string;
  value: string | number;
  disabled?: boolean;
  reference?: React.RefObject<any>;
  enumOptions?: typeof AssetActive | typeof AssetTypeConfig;
  mapOptions?: userSignUpData[] | CatalogOption[];
  optionlabel?: string;
  onDropDownChange?: (e: AutoCompleteChangeEvent) => void;
  mapStringOptions?: string[];
}

interface ElementProps {
  value: string | number;
  elementvalue: string;
  key?: string | number;
}

export default function InputComponent({
  onChange,
  children,
  name,
  mapOptions,
  enumOptions,
  reference,
  onDropDownChange,
  mapStringOptions,
  ...tagInputProperties
}: InputComponentProps & React.PropsWithChildren) {
  const [options, setOptions] = useState<userSignUpData[] | CatalogOption[]>(
    []
  );

  const [searchOptions, setSearchOptions] = useState<string[]>([]);

  useEffect(() => {
    if (mapOptions) {
      setOptions(mapOptions);
    }

    if (mapStringOptions) {
      setSearchOptions(mapStringOptions);
    }
    return;
  }, []);

  function generateOptions() {
    if (!options) return;
    const optionsList = [];
    let elementProps: ElementProps = { elementvalue: "", value: "" };

    for (let i = 0; i < options.length; i++) {
      let optionData = options[i];
      if (typeof options[i].id === "string") {
        optionData = optionData as userSignUpData;
        elementProps = {
          value: optionData.id,
          key: optionData.id,
          elementvalue: optionData.name.concat(
            " ",
            optionData.details.lastname
          ),
        };
      } else if (typeof options[i].id === "number") {
        optionData = optionData as CatalogOption;
        elementProps = {
          value: optionData.catalogDetail,
          key: optionData.id,
          elementvalue: optionData.catalogDetail,
        };
      }

      const option = React.createElement(
        "option",
        elementProps,
        elementProps.elementvalue
      );

      optionsList.push(option);
    }

    return optionsList;
  }

  function searchItems(e: AutoCompleteCompleteEvent) {
    const currentOps = [...searchOptions];

    const filteredOptions = mapStringOptions!.filter((opt) =>
      opt.toLowerCase().includes(e.query.toLowerCase())
    );

    setSearchOptions(mapStringOptions ? filteredOptions : currentOps);
  }

  return (
    <>
      <div className="w-full flex flex-col my-1 h-1/2">
        <label htmlFor={name} className="text-lg font-semibold">
          {children}
        </label>
        {tagInputProperties.type === "dropdown" && (
          <AutoComplete
            {...tagInputProperties}
            name={name}
            suggestions={searchOptions}
            completeMethod={searchItems}
            dropdown
            onChange={onDropDownChange}
          />
        )}

        {/* select  */}
        {tagInputProperties.type === "select" && (
          <select
            className="border-2 border-slate-600 rounded-md p-1 px-2 outline-none focus:border-slate-900"
            name={name}
            onChange={onChange}
            id={name}
            {...tagInputProperties}
          >
            <option value=""></option>
            {generateOptions()}

            {/* if options are a enum */}
            {enumOptions &&
              Object.values(enumOptions).map((enumName: string | number) => (
                <option key={enumName} value={enumName}>
                  {enumName}
                </option>
              ))}
          </select>
        )}

        {tagInputProperties.type !== "select" &&
          tagInputProperties.type !== "dropdown" && (
            // input
            <input
              className={`border-2 border-slate-600 rounded-md p-1 px-2 outline-none focus:border-slate-900 ${
                tagInputProperties.disabled ? "bg-slate-300" : "bg-white"
              }`}
              ref={reference || null}
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
