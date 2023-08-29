import { DataTable } from "primereact/datatable";
import { AssetConfig } from "../../../config/assets.config";
import { AssetData } from "../../../interfaces/asset.interface";

export function numValCell(field: string | number) {
  return (
    <p>
      {AssetConfig.valuePrefix} {""}
      {Number(field).toFixed(AssetConfig.decimalQuantity)}
    </p>
  );
}

export const exportCSV = (
  selectionOnly: boolean,
  reference: React.RefObject<DataTable<AssetData[]>>
) => {
  return reference.current?.exportCSV({ selectionOnly });
};
