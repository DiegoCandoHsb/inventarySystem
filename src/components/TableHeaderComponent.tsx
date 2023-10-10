import InputGroup from "./InputGroup";

interface Props {
  headerTitle: string;
  export?: boolean;
  fun?: () => Promise<any>;
}

export default function TableHeaderComponent({
  headerTitle,
  ...otherProps
}: Props) {

  return (
    <>
      <div className="font-bold text-center text-2xl w-full grid grid-cols-12 items-center ">
        <span className="col-span-4 col-start-5">{headerTitle}</span>
        <div className="col-span-4 col-start-12 flex justify-end">
          {otherProps.export && (
            <InputGroup
              inputType="button"
              name="Export"
              value=""
              buttonIcon="pi-file-excel"
              containerCls="p-0 m-0"
              onButtonClick={otherProps.fun}
            />
          )}
        </div>
      </div>
    </>
  );
}
