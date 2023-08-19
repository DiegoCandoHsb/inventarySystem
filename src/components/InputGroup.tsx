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
import { KeyFilterType } from "primereact/keyfilter";
import { InputSwitch } from "primereact/inputswitch";
import { Checkbox } from "primereact/checkbox";

interface InputGroupProps {
  inputType:
    | "text"
    | "number"
    | "date"
    | "searchDropdown"
    | "dropdown"
    | "decimal"
    | "textarea"
    | "password"
    | "switch"
    | "checkbox";
  label: string;
  name: string;
  value: string | number;
  placeholder?: string;
  options?: string[] | userSignUpData[] | SelectItemOptionsType;
  optionLabel?: string;
  optionValue?: string;
  decimalQuliantity?: number;
  disabled?: boolean;
  keyfilter?: KeyFilterType | undefined;
  containerCls?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onDateChange?: (e: CalendarChangeEvent) => void;
  onDropDownFilterChange?: (e: AutoCompleteChangeEvent) => void;
  onDropDownChange?: (e: DropdownChangeEvent) => void;
  onNumberChange?: (e: InputNumberChangeEvent) => void;
}

const defautlInputStyle = "w-full flex items-center";
const labelClassname = "font-semibold";
const containerClassname = "my-2 flex flex-col col-span-2";

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
            keyfilter={OtherProps.keyfilter}
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

      case "switch":
        return (
          <InputSwitch
            {...commonInputProps}
            value={value}
            style={{ width: "100%", height: "100%" }}
            checked
          />
        );

      case "checkbox":
        return (
          <Checkbox
            checked
            {...commonInputProps}
            value={value}
            style={{ width: "100%", height: "100%" }}
          />
        );
      default:
        break;
    }
  }

  return (
    <div
      className={containerClassname.concat(
        " ",
        OtherProps.containerCls as string
      )}
    >
      <label htmlFor={name} className={labelClassname}>
        {label}
      </label>
      {slectInputByType()}
    </div>
  );
}
