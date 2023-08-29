/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import {
  AssetPlainData,
  AssetTypesData,
  defaultAssetData,
  AssetData,
} from "../interfaces/asset.interface";
import { useLoaderData } from "react-router-dom";
import { useForm } from "./useForm";
import { DataTable, DataTableRowClickEvent } from "primereact/datatable";
import {
  CreateAsset,
  GetAllAssets,
  UpdateAsset,
} from "../services/asset.service";
import { Toast } from "primereact/toast";
import React from "react";
import { AssetConfig } from "../config/assets.config";

const useAssetForm = () => {
  const [assets, setAssets] = useState<AssetTypesData>(
    useLoaderData() as AssetTypesData
  );
  const [modal, setModal] = useState<boolean>(false);

  const [edit, setEdit] = useState<boolean>(false);

  const [formSettings, setFormSettings] = useState({
    defaultSettings: {
      submitButtonValue: "Create",
    },
    porcetaje1: 10,
    decialQuiantity: 2,
    submitButtonValue: "Create",
  });

  const { onChange, form, setState } =
    useForm<AssetPlainData>(defaultAssetData);

  useEffect(() => {
    calculateResValue();
    depreciations();
  }, [form.value, form.depreciationTime]);

  useEffect(() => {
    calculateValueBooks();
  }, [form.purchaseDate, form.monthlyDepreciation]);

  const submitButtonRef = useRef<HTMLInputElement>(null);
  const toastRef = useRef<Toast>(null);
  const dataTableRef = useRef<DataTable<AssetData[]>>(null);


  function calculateResValue() {
    //  valor residual  =  valor * 0.1 (valor por 10 porciento)
    const resValue = (form.value * formSettings.porcetaje1) / 100;

    setState((currentValues) => ({
      ...currentValues,
      residualValue: resValue,
    }));
  }

  function depreciations() {
    const value = form.value - form.residualValue;
    const annualDep = value / (form.depreciationTime / 12);
    const mensualDep = value / form.depreciationTime;

    setState((currentValues) => ({
      ...currentValues,
      annualDepreciation: validateNum(annualDep),
      monthlyDepreciation: validateNum(mensualDep),
    }));
  }

  function validateNum(num: number) {
    if (!isFinite(num)) return 0;
    return Number(num.toFixed(formSettings.decialQuiantity));
  }

  function calculateValueBooks() {
    //  valor en libros = (fecha actual - fecha de adqusicion ) * depresiacion mensual
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const currentMoth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const adqusicionDate = new Date(form.purchaseDate);
    const adqDay = adqusicionDate.getDay() + 1;
    const adqMonth = adqusicionDate.getMonth() + 1;
    const adqYear = adqusicionDate.getFullYear();

    // operations
    const days = currentDay - adqDay;
    const yearsToMoths = (currentYear - adqYear) * 12;
    let totalMonths = currentMoth - adqMonth + yearsToMoths;

    let newValueBooks = 0;
    if (days <= 0) {
      newValueBooks = form.value - totalMonths * form.monthlyDepreciation;
      if (totalMonths > form.depreciationTime) {
        newValueBooks = form.residualValue;
      }
    } else {
      totalMonths += 1;
      newValueBooks = form.value - totalMonths * form.monthlyDepreciation;

      if (totalMonths > form.depreciationTime) {
        newValueBooks = form.residualValue;
      }
    }

    setState((currentState) => ({
      ...currentState,
      valueBooks: validateNum(newValueBooks),
    }));
  }

  // open update modal
  function updateModal(e: DataTableRowClickEvent) {
    setEdit(true);
    setModal(true);
    AssetConfig.setDialogHeaderTitle("update");

    const { details, ...assetData } = e.data as AssetData;
    setState({
      ...assetData,
      ...details,
      purchaseDate: assetData.purchaseDate.substring(0, 10),
    } as AssetPlainData);

    setFormSettings((currentValues) => ({
      ...currentValues,
      submitButtonValue: "Update",
    }));
  }

  // create asset
  function createOrEditAsset() {
    if (!edit) {
      CreateAsset(formatData("responsibleName", "id"))
        .then(() => setModal(false))
        .catch((err) => {
          inputErrors(form);
          showErrorMessage(err);
          setModal(true);
        })
        .finally(async () => await setNewAssetsData());
    } else if (edit) {
      UpdateAsset(formatData("responsibleName"))
        .then(() => setModal(false))
        .catch((err) => {
          inputErrors(form);
          showErrorMessage(err);
          setModal(true);
        })
        .finally(async () => await setNewAssetsData());
    }
  }

  function inputErrors(data: typeof form) {
    const entries = Object.entries(data);

    const filledData = entries.filter((entry) => {
      if (entry[1].length > 1 || Number(entry[1]) > 0) {
        return entry;
      }
    });

    const emptyData = entries
      .map((entrie) => {
        if (!entrie[1].length || entrie[1] === 0) {
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

  async function setNewAssetsData() {
    const newAssetsData = await GetAllAssets();
    setAssets((currentAssets) => ({ ...currentAssets, ...newAssetsData }));
  }

  function showErrorMessage(error: any) {
    const errorStrings: string[] = (
      error.response.data.message as string[]
    ).map((str) => str.split("details.").join(" ").trim());

    const errorNodeList = [];
    for (let i = 0; i < errorStrings.length; i++) {
      const errorP = React.createElement("p", { key: i }, errorStrings[i]);
      errorNodeList.push(errorP);
    }

    toastRef.current?.show({
      severity: "error",
      summary: `Error ${error.response.status as number}`,
      detail: errorNodeList,
      life: 7000,
    });
  }

  function formatData(...propsToRemove: (keyof AssetPlainData)[]) {
    const { id, name, purchaseDate, ...details } = form;
    const data = {
      id,
      name,
      purchaseDate,
      details: {
        ...details,
      },
    };

    if (propsToRemove) {
      for (let i = 0; i < propsToRemove.length; i++) {
        delete data.details[propsToRemove[i] as keyof typeof details];
        delete data[propsToRemove[i] as keyof AssetData];
      }
    }
    return data;
  }

  return {
    assets,
    setAssets,
    modal,
    setModal,
    edit,
    setEdit,
    formSettings,
    setFormSettings,
    onChange,
    form,
    setState,
    submitButtonRef,
    createOrEditAsset,
    updateModal,
    toastRef,
    dataTableRef,
  };
};

export default useAssetForm;
