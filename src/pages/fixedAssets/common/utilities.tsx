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

export function inputErrors(data: Record<string, any>) {
   const entries = Object.entries(data);

   const filledData = entries.filter((entry) => {
     if ((entry[1] as string).length > 1 || Number(entry[1]) > 0) {
       return entry;
     }
   });

   const emptyData = entries
     .map((entrie) => {
       if (!(entrie[1] as string).length || entrie[1] === 0) {
         return entrie;
       }
       return;
     })
     .filter((x) => x !== undefined);

   for (let i = 0; i < emptyData.length; i++) {
     let emptyInp: HTMLInputElement | null = document.querySelector(
       `#${emptyData[i]![0]}`
     );

     if (emptyInp === null || emptyInp.disabled) continue;
     if (emptyInp.nodeName === "SPAN") {
       emptyInp = emptyInp.firstChild as HTMLInputElement;
     }
     emptyInp.classList.add("input-error");
   }

   for (let i = 0; i < filledData.length; i++) {
     let filledImp: HTMLInputElement | null = document.querySelector(
       `#${filledData[i]![0]}`
     );

     if (filledImp === null || filledImp.disabled) continue;
     if (filledImp.nodeName === "SPAN") {
       filledImp = filledImp.firstChild as HTMLInputElement;
     }
     filledImp.classList.remove("input-error");
   }
 }
