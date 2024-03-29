import { DataTable } from "primereact/datatable";
import { AssetConfig } from "../../../config/assets.config";
import { FormatedAssetData } from "../../../interfaces/asset.interface";
import { userSignUpData } from "../../../interfaces/userSignUpData.interface";
import * as XLSX from "xlsx";
import { downdloadFile } from "../../../services/asset.service";
import { downloadUsersFile } from "../../../services/user.service";
import { Toast } from "primereact/toast";
import React from "react";
import { AxiosError } from "axios";

export function numValCell(field: string | number) {
  return (
    <p>
      {AssetConfig.valuePrefix}
      {Number(field).toFixed(AssetConfig.decimalQuantity)}
    </p>
  );
}

// Deprecated
export const exportCSV = (
  selectionOnly: boolean,
  reference: React.RefObject<DataTable<FormatedAssetData[]>>
) => {
  return reference.current?.exportCSV({ selectionOnly });
};

export function exportToXlsx(
  assets: FormatedAssetData[],
  fileName: string
): void {
  const plainData = assets.map(({ details, ...data }) => {
    delete data.id;
    return { ...data, ...details };
  });

  downdloadFile(plainData, fileName)
    .then((workbook) => {
      XLSX.writeFile(
        workbook as unknown as XLSX.WorkBook,
        fileName.concat("_", new Date().getTime().toString(), ".xlsx")
      );
    })
    .catch((err) => console.log(err));
}

export function exportUsersToXlsx(users: userSignUpData[], fileName: string) {
  downloadUsersFile(users, fileName)
    .then((workbook) => {
      XLSX.writeFile(
        workbook as unknown as XLSX.WorkBook,
        fileName.concat("_", new Date().getTime().toString(), ".xlsx")
      );
    })
    .catch((err) => console.log(err));
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

export function clearData(
  data: Record<string, any>
): Record<string, string | number | boolean> | userSignUpData {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      return [
        key,
        typeof value === "string"
          ? value.trim()
          : typeof value === "object" && !Array.isArray(value)
          ? clearData(value as Record<string, string | number | boolean>)
          : value,
      ];
    })
  );
}

export function showErrorMessage(
  error: Required<AxiosError<{ [key: string]: any }>>,
  toastRef: React.RefObject<Toast>
) {
  const errorStrings: string | string[] = error.response.data.message as
    | string
    | string[];

  if (Array.isArray(errorStrings)) {
    errorStrings.map((str) => str.split("details.").join(" ").trim());

    const errorNodeList = [];
    for (let i = 0; i < errorStrings.length; i++) {
      const errorP = React.createElement("h1", { key: i }, errorStrings[i]);
      errorNodeList.push(errorP);
    }

    toastRef.current?.show({
      severity: "error",
      summary: `Error ${error.response.status}`,
      detail: errorNodeList,
      life: 7000,
    });

    return;
  }

  toastRef.current?.show({
    severity: "error",
    summary: `Error ${error.response.status}`,
    detail: errorStrings,
    life: 7000,
  });
}
