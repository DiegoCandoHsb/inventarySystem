import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import InputComponent from "../../components/Auth-Components/InputComponent";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { useForm } from "../../hooks/useForm";
import { ButtonComponent } from "../../components/Auth-Components/ButtonComponent";
import {
  AssetData,
  AssetPlainData,
  AssetTypesData,
  defaultAssetData,
} from "../../interfaces/asset.interface";
import { GetAllAssets } from "../../services/asset.service";
import { AssetActive } from "../../interfaces/enums/assetActive";
import { GetUsers } from "../../services/user.service";

//  valor en libros = (fecha actual - fecaha de adqusicion ) * depresiacion mensual

export default function ElectronicEquipment() {
  // const data = useLoaderData() as AssetTypesData;
  const [assets] = useState<AssetTypesData>(useLoaderData() as AssetTypesData);

  const [modal, setModal] = useState<boolean>(false);

  const [formSettings, setFormSettings] = useState({
    porcetaje1: 10,
    decialQuiantity: 2,
  });

  const { onChange, form, setState } =
    useForm<AssetPlainData>(defaultAssetData);

  useEffect(() => {
    calculareResValue();
    depreciations();
  }, [form.value, form.depreciationTime]);

  useEffect(() => {
    calculateValueBooks();
  }, [form.purchaseDate, form.monthlyDepreciation]);

  // input refs
  const residualValueRef = useRef<HTMLInputElement>(null);
  const annualDepreciationRef = useRef<HTMLInputElement>(null);
  const monthlyDepreciationRef = useRef<HTMLInputElement>(null);
  const valueBooksRef = useRef<HTMLInputElement>(null);

  function calculareResValue() {
    //  valor residual  =  valor * 0.1 (valor por 10 porciento)
    const resValue = (form.value * formSettings.porcetaje1) / 100;
    if (!residualValueRef.current) return;
    residualValueRef.current.value = resValue.toString();
    form.residualValue = resValue;
  }

  function depreciations() {
    //  depresiacion anual = (valor - valor residual)/(meses/12)
    //  depresiacion mensual = (valor - valor residual)/(meses)

    const value = form.value - form.residualValue;
    const annualDep = value / (form.depreciationTime / 12);

    const mensualDep = value / form.depreciationTime;

    if (!annualDepreciationRef.current || !monthlyDepreciationRef.current)
      return;

    if (isFinite(annualDep) || isFinite(mensualDep)) {
      annualDepreciationRef.current.value = annualDep.toFixed(
        formSettings.decialQuiantity
      );
      monthlyDepreciationRef.current.value = mensualDep.toFixed(
        formSettings.decialQuiantity
      );

      form.annualDepreciation = Number(
        annualDep.toFixed(formSettings.decialQuiantity)
      );
      form.monthlyDepreciation = Number(
        mensualDep.toFixed(formSettings.decialQuiantity)
      );
    }
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

      form.valueBooks = newValueBooks;
    } else {
      totalMonths += 1;
      newValueBooks = form.value - totalMonths * form.monthlyDepreciation;

      if (totalMonths > form.depreciationTime) {
        newValueBooks = form.residualValue;
      }
    }

    isFinite(newValueBooks)
      ? (form.valueBooks = Number(
          newValueBooks.toFixed(formSettings.decialQuiantity)
        ))
      : "0";

    if (valueBooksRef.current) {
      valueBooksRef.current.value = newValueBooks.toFixed(
        formSettings.decialQuiantity
      );
    }
  }

  function logResults() {
    console.log(form.responsible);
    return form.responsible.toString();
  }

  return (
    <div>
      <div className="w-1/12">
        <ButtonComponent
          title="Add"
          onclickButton={() => {
            setModal(true);
            setState(defaultAssetData);
          }}
        />
      </div>
      {/* table */}
      <div className="card">
        <DataTable
          className="m-5 shadow-md"
          value={assets.furnitureAndFixturesAssets.map((asset) => {
            for (let i = 0; i < (assets.users ? assets.users.length : 1); i++) {
              if (asset.details.responsible === assets.users![i].id) {
                asset.details.responsibleName = assets.users![i].name;
              }
            }
            return asset;
          })}
          emptyMessage={"No Assets found"}
          selectionMode="single"
          title="Electronic Equipments"
          onRowDoubleClick={(e) => {
            const { details, ...assetData } = e.data as AssetData;
            setState({
              ...assetData,
              ...details,
              purchaseDate: assetData.purchaseDate.substring(0, 10),
            } as AssetPlainData);
            setModal(true);
          }}
          paginator
          rows={25}
          rowsPerPageOptions={[25, 50, 75, 100]}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column header="ID" field="id" style={{ width: "15%" }}></Column>
          <Column header="Name" field="name" style={{ width: "15%" }}></Column>
          <Column
            header="Acq. Date"
            field="purchaseDate"
            style={{ width: "15%" }}
          ></Column>
          <Column
            header="Brand"
            field="details.brand"
            style={{ width: "15%" }}
          ></Column>
          <Column
            header="Monthly Dep"
            field="details.monthlyDepreciation"
            style={{ width: "15" }}
          ></Column>
          <Column
            header="Val Books"
            field="details.valueBooks"
            style={{ width: "15" }}
          ></Column>
          <Column
            header="Insured"
            field="details.insured"
            style={{ width: "15" }}
          ></Column>
          <Column
            header="Responsible"
            field="details.responsibleName"
            style={{ width: "15" }}
          ></Column>
        </DataTable>
      </div>

      {/* modal */}
      <Dialog
        header="Create Asset"
        draggable={false}
        visible={modal}
        className="w-1/3"
        onHide={() => setModal(false)}
      >
        <InputComponent
          name="name"
          placeholder="name"
          type="text"
          value={form.name}
          onChange={(e) =>
            onChange(e.target.value, e.target.name as keyof AssetPlainData)
          }
        >
          Name
        </InputComponent>
        <InputComponent
          name="purchaseDate"
          placeholder="purchaseDate"
          type="date"
          value={form.purchaseDate}
          onChange={(e) =>
            onChange(e.target.value, e.target.name as keyof AssetPlainData)
          }
        >
          Purchase Date
        </InputComponent>
        <InputComponent
          name="responsible"
          placeholder="responsible"
          type="select"
          value={form.responsible}
          mapOptions={assets.users}
          onChange={(e) =>
            onChange(e.target.value, e.target.name as keyof AssetPlainData)
          }
        >
          Responsible
        </InputComponent>
        <InputComponent
          name="supplier"
          placeholder="supplier"
          type="text"
          value={form.supplier}
          onChange={(e) =>
            onChange(e.target.value, e.target.name as keyof AssetPlainData)
          }
        >
          Supplier
        </InputComponent>
        <InputComponent
          name="value"
          placeholder="value"
          type="number"
          value={form.value}
          onChange={(e) =>
            onChange(e.target.value, e.target.name as keyof AssetPlainData)
          }
        >
          value
        </InputComponent>
        <InputComponent
          name="depreciationTime"
          placeholder="depreciationTime"
          type="number"
          value={form.depreciationTime}
          onChange={(e) =>
            onChange(e.target.value, e.target.name as keyof AssetPlainData)
          }
        >
          Depreciation Time
        </InputComponent>
        <InputComponent
          name="residualValue"
          placeholder="residualValue"
          type="number"
          value={form.residualValue}
          disabled={true}
          reference={residualValueRef}
          onChange={(e) =>
            onChange(e.target.value, e.target.name as keyof AssetPlainData)
          }
        >
          Residual Value
        </InputComponent>
        <InputComponent
          name="annualDepreciation"
          placeholder="annualDepreciation"
          type="number"
          value={form.annualDepreciation}
          disabled={true}
          reference={annualDepreciationRef}
          onChange={(e) => {
            onChange(e.target.value, e.target.name as keyof AssetPlainData);
          }}
        >
          Annual Depreciation
        </InputComponent>
        <InputComponent
          name="monthlyDepreciation"
          placeholder="monthlyDepreciation"
          type="number"
          value={form.monthlyDepreciation}
          disabled={true}
          reference={monthlyDepreciationRef}
          onChange={(e) =>
            onChange(e.target.value, e.target.name as keyof AssetPlainData)
          }
        >
          Monthly Depreciation
        </InputComponent>
        <InputComponent
          name="valueBooks"
          placeholder="value in books"
          type="text"
          value={form.valueBooks}
          disabled={true}
          reference={valueBooksRef}
          onChange={(e) =>
            onChange(e.target.value, e.target.name as keyof AssetPlainData)
          }
        >
          Value in Books
        </InputComponent>
        <InputComponent
          name="insured"
          placeholder="insured"
          type="number"
          value={form.insured}
          onChange={(e) =>
            onChange(e.target.value, e.target.name as keyof AssetPlainData)
          }
        >
          Insured
        </InputComponent>
        <InputComponent
          name="active"
          placeholder="active"
          type="select"
          value={form.active}
          enumOptions={AssetActive}
          onChange={(e) =>
            onChange(e.target.value, e.target.name as keyof AssetPlainData)
          }
        >
          Active
        </InputComponent>
        <InputComponent
          name="observation"
          placeholder="observation"
          type="text"
          value={form.observation}
          onChange={(e) =>
            onChange(e.target.value, e.target.name as keyof AssetPlainData)
          }
        >
          observation
        </InputComponent>
        <ButtonComponent title="Log" onclickButton={() => logResults()} />
      </Dialog>
    </div>
  );
}

export async function loadAssets(): Promise<AssetTypesData> {
  const data = await GetAllAssets();
  const users = await GetUsers();

  return {
    ...data,
    users,
  };
}
