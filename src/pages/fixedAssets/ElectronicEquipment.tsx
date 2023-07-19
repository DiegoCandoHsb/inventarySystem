import { useState } from "react";
import { GetAllAssets } from "../../services/asset.service";
import { useLoaderData } from "react-router-dom";
import {
  AssetPlainData,
  AssetTypesData,
} from "../../interfaces/asset.interface";
import { ButtonComponent } from "../../components/Auth-Components/ButtonComponent";
import InputComponent from "../../components/Auth-Components/InputComponent";
import { Dialog } from "primereact/dialog";
import { useForm } from "../../hooks/useForm";
import { AssetActive } from "../../interfaces/enums/assetActive";
import { GetUsers } from "../../services/user.service";

export default function ElectronicEquipment() {
  // const data = useLoaderData() as AssetTypesData;
  const [assets] = useState<AssetTypesData>(useLoaderData() as AssetTypesData);

  const [modal, setModal] = useState<boolean>(false);

  const {
    active,
    anualDepreciation,
    depreciationTime,
    insured,
    monthlyDepreciation,
    name,
    observation,
    purchaseDate,
    responsible,
    supplier,
    value,
    valueBooks,
    residualValue,
    onChange,
    form,
  } = useForm<AssetPlainData>({
    name: "",
    purchaseDate: "",
    assetType: "",
    responsible: "",
    supplier: "",
    value: 0,
    depreciationTime: 0,
    residualValue: 0,
    anualDepreciation: 0,
    monthlyDepreciation: 0,
    valueBooks: 0,
    observation: "",
    insured: 0,
    active: AssetActive.new,
  });

  function logResults() {
    console.log(form);
  }

  return (
    <div>
      <div className="w-1/12">
        <ButtonComponent title="Add" onclickButton={() => setModal(true)} />
      </div>

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
          value={name}
          onChange={(e) =>
            onChange(e.target.value, e.target.name as keyof AssetPlainData)
          }
        >
          name
        </InputComponent>
        <InputComponent
          name="purchaseDate"
          placeholder="purchaseDate"
          type="date"
          value={purchaseDate}
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
          value={responsible}
          mapOptions={() => GetUsers()}
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
          value={supplier}
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
          value={value}
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
          value={depreciationTime}
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
          value={residualValue}
          onChange={(e) =>
            onChange(e.target.value, e.target.name as keyof AssetPlainData)
          }
        >
          Residual Value
        </InputComponent>
        <InputComponent
          name="anualDepreciation"
          placeholder="anualDepreciation"
          type="number"
          value={anualDepreciation}
          onChange={(e) =>
            onChange(e.target.value, e.target.name as keyof AssetPlainData)
          }
        >
          Anual Depreciation
        </InputComponent>
        <InputComponent
          name="monthlyDepreciation"
          placeholder="monthlyDepreciation"
          type="number"
          value={monthlyDepreciation}
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
          value={valueBooks}
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
          value={insured}
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
          value={active}
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
          value={observation}
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
  console.log(data);
  return {
    ...data,
  };
}
