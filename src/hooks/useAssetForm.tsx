/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { AssetPlainData, AssetTypesData, defaultAssetData, AssetData } from '../interfaces/asset.interface';
import { useLoaderData } from "react-router-dom";
import { useForm } from "./useForm";
import { DataTableRowClickEvent } from 'primereact/datatable';
import { CreateAsset, GetAllAssets, UpdateAsset } from '../services/asset.service';

const useAssetForm = () => {
  const [assets, setAssets] = useState<AssetTypesData>(
    useLoaderData() as AssetTypesData
  );
  const [modal, setModal] = useState<boolean>(false);

  const [edit, setEdit] = useState<boolean>(false);

  const [formSettings, setFormSettings] = useState({
    defaultSettings: {
      porcetaje1: 10,
      decialQuiantity: 2,
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
      console.log(form);
      if (!edit) {
        CreateAsset(formatData("responsibleName", "id"))
          .catch((err) => {
            alert(err.response.data.message);
          })
          .finally(async () => await setNewAssetsData());
      } else if (edit) {
        UpdateAsset(formatData("responsibleName"))
          .catch((err) => {
            alert(err.response.data.message);
          })
          .finally(async () => await setNewAssetsData());
      }
    }

    async function setNewAssetsData() {
      const newAssetsData = await GetAllAssets();
      setAssets((currentAssets) => ({ ...currentAssets, ...newAssetsData }));
      setModal(false);
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
      console.log(data)
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
    updateModal
  };
};

export default useAssetForm;
