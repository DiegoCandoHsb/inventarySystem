import { InputText } from "primereact/inputtext";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { useEffect, useRef, useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { userSignUpData } from "../interfaces/userSignUpData.interface";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { SelectItemOptionsType } from "primereact/selectitem";
import { InputTextarea } from "primereact/inputtextarea";
import { Password } from "primereact/password";
import { KeyFilterType } from "primereact/keyfilter";
import { InputSwitch } from "primereact/inputswitch";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { Button } from "primereact/button";
import { AssetConfig } from "../config/assets.config";
import { AssetUbication } from "../interfaces/enums/assetUbication.enum";
import {
  FileUpload,
  FileUploadHandlerEvent,
  FileUploadUploadEvent,
} from "primereact/fileupload";

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
    | "checkbox"
    | "button"
    | "upload";
  label?: string;
  name: string;
  value: string | number | boolean | Date;
  placeholder?: string;
  options?: string[] | userSignUpData[] | SelectItemOptionsType;
  optionLabel?: string;
  optionValue?: string;
  decimalQuliantity?: number;
  disabled?: boolean;
  keyfilter?: KeyFilterType | undefined;
  containerCls?: string;
  inputCls?: string;
  containerSpan?: string;
  buttonIcon?: string;
  enumOptions?: AssetUbication;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onDateChange?: (e: CalendarChangeEvent) => void;
  onDropDownFilterChange?: (e: AutoCompleteChangeEvent) => void;
  onDropDownChange?: (e: DropdownChangeEvent) => void;
  onNumberChange?: (e: InputNumberChangeEvent) => void;
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onCheckBoxChange?: (event: CheckboxChangeEvent) => void;
  onUpload?: (e: FileUploadHandlerEvent) => any;
}

const defautlInputStyle = "w-full flex items-center";
const labelClassname = "font-semibold";
const containerClassname = "my-2 flex flex-col justify-between";

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
        return (
          <>
            {userOption.name.concat(
              " ",
              userOption.details.secondname,
              " ",
              userOption.details.lastname,
              " ",
              userOption.details.secondlastname
            )}
          </>
        );
      } else {
        return userOption ? (
          <>
            {userOption.name.concat(
              " ",
              userOption.details.secondname,
              " ",
              userOption.details.lastname,
              " ",
              userOption.details.secondlastname
            )}
          </>
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
      placeholder,
      className: defautlInputStyle.concat(" ", OtherProps.inputCls ?? ""),
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
            value={value ? new Date(value.toString().replace("-", "/")) : null}
            onChange={OtherProps.onDateChange}
            dateFormat="dd/mm/yy"
            showIcon
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
            valueTemplate={(opt: userSignUpData) =>
              templateType(opt, "selected")
            }
          />
        );

      case "decimal":
        return (
          <InputNumber
            {...commonInputProps}
            value={Number(value)}
            maxFractionDigits={OtherProps.decimalQuliantity}
            onChange={OtherProps.onNumberChange}
            prefix={AssetConfig.valuePrefix}
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
            value={value as string}
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
            value={value as string}
            // style={{ width: "100%" }}
            checked
          />
        );

      case "checkbox":
        return (
          <Checkbox
            {...commonInputProps}
            style={{ width: "100%", height: "100%" }}
            value={value}
            checked={value as boolean}
            onClick={OtherProps.onCheckBoxChange}
          />
        );

      case "button":
        return (
          <Button
            {...commonInputProps}
            icon={`${
              OtherProps.buttonIcon ? "pi ".concat(OtherProps.buttonIcon) : ""
            }`}
            label={value.toString()}
            onClick={OtherProps.onButtonClick}
            tooltip={name}
            tooltipOptions={{
              position: "bottom",
            }}
          />
        );

      case "upload":
        return (
          <FileUpload
            {...commonInputProps}
            mode="basic"
            chooseLabel={value.toString()}
            chooseOptions={{
              icon: `${
                OtherProps.buttonIcon ? "pi ".concat(OtherProps.buttonIcon) : ""
              }`,
              iconOnly: true,
            }}
            auto
            customUpload
            uploadHandler={OtherProps.onUpload}
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
        `${OtherProps.containerSpan ? OtherProps.containerSpan : "col-span-2"}`,
        " ",
        `${OtherProps.containerCls ? OtherProps.containerCls : ""}`
      )}
    >
      <label htmlFor={name} className={labelClassname}>
        {label}
      </label>
      <div className="flex justify-center">{slectInputByType()}</div>
    </div>
  );
}
