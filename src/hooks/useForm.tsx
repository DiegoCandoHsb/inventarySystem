import { useState } from "react";

export const useForm = <T extends object>(initState: T) => {
  const [state, setState] = useState(initState);

  const onChange = (value: string | number, field: keyof T): void => {
    setState({
      ...state,
      // [field]:
      //   !isNaN(value as number) && ![0, 10].includes(value.toString().length)
      //     ? Number(value)
      //     : value.toString(),
      [field]: value,
    });
  };

  return {
    ...state,
    form: state,
    onChange,
    setState,
  };
};
