import { InputText } from "primereact/inputtext";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { useEffect, useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { userSignUpData } from "../interfaces/userSignUpData.interface";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { SelectItemOptionsType } from "primereact/selectitem";
import { InputTextarea } from "primereact/inputtextarea";
import { Password } from "primereact/password";

interface InputGroupProps {
  inputType:
    | "text"
    | "number"
    | "date"
    | "searchDropdown"
    | "dropdown"
    | "decimal"
    | "textarea"
    | "password";
  label: string;
  name: string;
  value: string | number;
  placeholder?: string;
  options?: string[] | userSignUpData[] | SelectItemOptionsType;
  optionLabel?: string;
  optionValue?: string;
  decimalQuliantity?: number;
  disabled?: boolean;
  keyfilter?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onDateChange?: (e: CalendarChangeEvent) => void;
  onDropDownFilterChange?: (e: AutoCompleteChangeEvent) => void;
  onDropDownChange?: (e: DropdownChangeEvent) => void;
  onNumberChange?: (e: InputNumberChangeEvent) => void;
}

const defautlInputStyle = "w-full flex items-center";

export default function InputGroup({
  inputType,
  placeholder,
  label,
  name,
  value,
  onChange,
  ...OtherProps
}: InputGroupProps) {
  const [options, setOptions] = useState<
    string[] | userSignUpData[] | SelectItemOptionsType
  >([]);

  useEffect(() => {
    if (OtherProps.options) {
      setOptions(OtherProps.options);
    }
  }, [OtherProps.options]);

  function searchItems(e: AutoCompleteCompleteEvent) {
    const currentOps = [...options];
    const filteredOptions = OtherProps.options
      ? (OtherProps.options as string[]).filter((opt) =>
          opt.toLowerCase().includes(e.query.toLowerCase())
        )
      : [];

    setOptions(filteredOptions ? filteredOptions : currentOps);
  }

  function templateType(
    option: unknown,
    type: "items" | "selected"
  ): React.ReactNode {
    if (typeof options[0] === "string") {
      return <>{option}</>;
    } else {
      const userOption = option as userSignUpData;
      if (type === "items") {
        return <>{userOption.name.concat(" ", userOption.details.lastname)}</>;
      } else {
        return userOption ? (
          <>{userOption.name.concat(" ", userOption.details.lastname)}</>
        ) : (
          <>{placeholder}</>
        );
      }
    }
  }

  function slectInputByType(type = inputType) {
    const commonInputProps = {
      id: name,
      name: name,
      placeholder: placeholder,
      className: defautlInputStyle,
      disabled: OtherProps.disabled,
    };

    switch (type) {
      case "text":
        return (
          <InputText
            {...commonInputProps}
            value={value as string}
            onChange={onChange}
          />
        );

      case "date":
        return (
          <Calendar
            {...commonInputProps}
            value={value ? new Date(value) : null}
            onChange={OtherProps.onDateChange}
            dateFormat="dd/mm/yy"
          />
        );

      case "searchDropdown":
        return (
          <AutoComplete
            {...commonInputProps}
            value={value}
            suggestions={options}
            completeMethod={searchItems}
            onChange={OtherProps.onDropDownFilterChange}
            dropdown
          />
        );

      case "dropdown":
        return (
          <Dropdown
            {...commonInputProps}
            value={value}
            options={options}
            onChange={OtherProps.onDropDownChange}
            optionLabel={OtherProps.optionLabel}
            optionValue={OtherProps.optionValue}
            itemTemplate={(opt) => templateType(opt, "items")}
            // valueTemplate={(opt: userSignUpData) =>
            // templateType(opt, "selected")
            // }
          />
        );

      case "decimal":
        return (
          <InputNumber
            {...commonInputProps}
            value={Number(value)}
            maxFractionDigits={OtherProps.decimalQuliantity}
            onChange={OtherProps.onNumberChange}
            prefix="$ " // settings
          />
        );

      case "number":
        return (
          <InputNumber
            {...commonInputProps}
            value={Number(value)}
            onChange={OtherProps.onNumberChange}
          />
        );

      case "textarea":
        return (
          <InputTextarea
            {...commonInputProps}
            value={value.toString()}
            onChange={onChange}
          />
        );

      case "password":
        return (
          <Password
            {...commonInputProps}
            value={value}
            onChange={onChange}
            feedback={false}
            inputClassName={commonInputProps.className}
            toggleMask
          />
        );
      default:
        break;
    }
  }

  return (
    <>
      <label htmlFor={name}>{label}</label>
      {slectInputByType()}
    </>
  );
}
