import React from "react";
import { useState, useEffect, useRef } from "react";

import { DataTable, DataTableRowClickEvent } from "primereact/datatable";
import { Toast } from "primereact/toast";
import { AxiosError } from "axios";

import { useLoaderData } from "react-router-dom";
import { useForm } from "./useForm";
import {
  AssetTypesData,
  defaultAssetData,
  FormatedAssetData,
  PlainAssetData,
} from "../interfaces/asset.interface";
import {
  CreateAsset,
  UpdateAsset,
  getEspecificAssets,
} from "../services/asset.service";
import { AssetConfig, AssetTypeConfig } from "../config/assets.config";
import { inputErrors } from "../pages/fixedAssets/common/utilities";

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

  const [filters, setFilters] = useState("");

  const { onChange, form, setState } =
    useForm<PlainAssetData>(defaultAssetData);

  useEffect(() => {
    calculateResValue();
    depreciations();
  }, [form.unitValue, form.depreciationTime, form.residualValue]);

  useEffect(() => {
    calculateValueBooks();
  }, [form.purchaseDate, form.monthlyDepreciation]);

  const submitButtonRef = useRef<HTMLInputElement>(null);
  const toastRef = useRef<Toast>(null);
  const dataTableRef = useRef<DataTable<FormatedAssetData[]>>(null);

  function calculateResValue() {
    //  valor residual  =  valor * 0.1 (valor por 10 porciento)
    const resValue = (form.unitValue * formSettings.porcetaje1) / 100;

    setState((currentValues) => ({
      ...currentValues,
      residualValue: resValue,
    }));
  }

  function depreciations() {
    const value = form.unitValue - form.residualValue;
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
      newValueBooks = form.unitValue - totalMonths * form.monthlyDepreciation;
      if (totalMonths > form.depreciationTime) {
        newValueBooks = form.residualValue;
      }
    } else {
      totalMonths += 1;
      newValueBooks = form.unitValue - totalMonths * form.monthlyDepreciation;

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

    const { details, ...assetData } = e.data as FormatedAssetData;
    setState({
      ...assetData,
      ...details,
    });

    setFormSettings((currentValues) => ({
      ...currentValues,
      submitButtonValue: "Update",
    }));
  }

  // create asset
  function createOrEditAsset(assetType: AssetTypeConfig) {
    form.type = assetType;

    if (!edit) {
      CreateAsset(form)
        .then(() => setModal(false))
        .catch((err: Required<AxiosError<object>>) => {
          inputErrors(form);
          showErrorMessage(err);
          setModal(true);
        })
        .finally(() => void setNewAssetsData(assetType));
    } else if (edit) {
      UpdateAsset(form)
        .then(() => setModal(false))
        .catch((err: Required<AxiosError<object>>) => {
          inputErrors(form);
          showErrorMessage(err);
          setModal(true);
        })
        .finally(() => void setNewAssetsData(assetType));
    }
  }

  async function setNewAssetsData(assetType: AssetTypeConfig) {
    // const newAssetsData2 = await GetAllAssets();
    const newAssetsData: FormatedAssetData[] = await getEspecificAssets(
      assetType
    );

    setAssets((currentAssets) => ({
      ...currentAssets,
      assets: newAssetsData,
    }));
    return;
  }

  function showErrorMessage(error: Required<AxiosError<object>>) {
    const errorStrings: string[] = (
      error.response.data as { message: string[] }
    ).message.map((str) => str.split("details.").join(" ").trim());

    const errorNodeList = [];
    for (let i = 0; i < errorStrings.length; i++) {
      const errorP = React.createElement("p", { key: i }, errorStrings[i]);
      errorNodeList.push(errorP);
    }

    toastRef.current?.show({
      severity: "error",
      summary: `Error ${error.response.status}`,
      detail: errorNodeList,
      life: 7000,
    });
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
    filters,
    setFilters,
    setNewAssetsData,
  };
};

export default useAssetForm;
