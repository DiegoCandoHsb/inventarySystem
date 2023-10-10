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

// Deprecated
export const exportCSV = (
  selectionOnly: boolean,
  reference: React.RefObject<DataTable<AssetData[]>>
) => {
  return reference.current?.exportCSV({ selectionOnly });
};

export async function exportExcel(assets: AssetData[], fileName: string) {
  await import("xlsx").then(async (xlsx) => {
    const worksheet = xlsx.utils.json_to_sheet(
      assets.map((x) => {
        return { ...x, ...x.details };
      }) || []
    );
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };

    const excelBuffer = xlsx.write(workbook, {
      type: "array",
      bookType: "xlsx",
    }) as BlobPart;

    await saveAsExcelFile(excelBuffer, fileName);
  });
}

async function saveAsExcelFile(buffer: BlobPart, fileName: string) {
  await import("file-saver").then((module) => {
    if (module && module.default) {
      const EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const data = new Blob([buffer], {
        type: EXCEL_TYPE,
      });

      module.default.saveAs(
        data,
        fileName.concat("_export_", new Date().getTime().toString(), ".xlsx")
      );
    }
  });
}

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
