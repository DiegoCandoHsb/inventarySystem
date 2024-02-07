import { FileUploadHandlerEvent } from "primereact/fileupload";
import { uploadFile } from "../services/asset.service";
import InputGroup from "./InputGroup";

interface Props {
  headerTitle: string;
  export?: boolean;
  exportFun?: () => void;
  importFun?: (e: FileUploadHandlerEvent) => void;
  filters?: string;
  setGlobalFilter?: (val: string) => void;
}

export default function TableHeaderComponent({
  headerTitle,
  ...otherProps
}: Props) {
  return (
    <>
      <div className="font-bold text-2xl w-full grid grid-cols-12 text-center items-center">
        <span className="col-span-3 col-start-6">{headerTitle}</span>

        <span className="p-input-icon-right col-span-2 col-start-9">
          <i className="pi pi-search" />
          <InputGroup
            inputType="text"
            name={"Serch"}
            value={otherProps.filters!}
            placeholder="Search"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              otherProps.setGlobalFilter!(e.target.value)
            }
          />
        </span>

        <div className="col-span-2 col-start-11 flex justify-end gap-5">
          {otherProps.export && (
            <>
              <InputGroup
                inputType="upload"
                name="file"
                value=""
                buttonIcon="pi-upload"
                onUpload={otherProps.importFun}

                // inputCls="w-15 text-left flex items-center"
                // containerCls="w-14"
              />
              <InputGroup
                inputType="button"
                name="Export"
                value=""
                buttonIcon="pi-download"
                onButtonClick={otherProps.exportFun}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
