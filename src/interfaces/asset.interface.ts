/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AssetConfig, AssetTypeConfig } from "../config/assets.config";
import { Catalog } from "./catalog.interface";
import { AssetActive } from "./enums/assetActive";
import { AssetUbication } from "./enums/assetUbication.enum";
import { userSignUpData } from "./userSignUpData.interface";

// export interface AssetData {
//   id?: number;
//   name: string;
//   details: {
//     type: AssetTypeConfig;
//     brand: string;
//     serialNumber: string;
//     model: string;
//     color: string;
//     responsible: string;
//     responsibleName?: string | undefined;
//     supplier: string;
//     value: number;
//     depreciationTime: number;
//     residualValue: number;
//     annualDepreciation: number;
//     monthlyDepreciation: number;
//     valueBooks: number;
//     observation: string;
//     insured: number;
//     active: AssetActive;
//     ubication: AssetUbication;
//   };
//   purchaseDate: string;
// }

export interface AssetTypesData {
  // assetsList?: FormatedAssetData[];
  // electronicEquipmentAssets?: FormatedAssetData[];
  // furnitureAndFixturesAssets?: FormatedAssetData[];
  // expensesAssets?: FormatedAssetData[];

  assets?: FormatedAssetData[],
  users?: userSignUpData[];
  catalog?: Catalog;
}

export interface AssetPlainData {
  id?: number;
  name: string;
  purchaseDate: string;
  assetType: AssetTypeConfig;
  serialNumber: string;
  brand: string;
  model: string;
  color: string;
  responsible: string;
  responsibleName?: string | undefined;
  supplier: string;
  value: number;
  depreciationTime: number;
  residualValue: number;
  annualDepreciation: number;
  monthlyDepreciation: number;
  valueBooks: number;
  observation: string;
  insured: number;
  active: AssetActive;
  ubication: AssetUbication;
}

/// nuevos
export interface AssetDetailsData {
  code: string;
  quantity: number;
  brand: string;
  model: string;
  serialNumber: string;
  provider: string;
  unitValue: number;
  totalValue: number;
  depreciationTime: number;
  residualValue: number;
  annualDepreciation: number;
  monthlyDepreciation: number;
  valueBooks: number;
  state: string; // observation DB
  active: boolean;
  responsible: string;
  ubication: string; // observation DB
  type: AssetTypeConfig;
  responsibleName?: string | undefined;
  color?: string;
  invoice?: string;
  insured?: number;
  observation?: string;
}

interface AssetEETemplate {
  inches?: string;
  processor?: string;
  kitValue?: number;
  speed?: string;
  ram?: string;
  hdd?: string;
}

export interface FormatedAssetData {
  id?: number;
  itemName: string;
  purchaseDate: string;
  details: AssetDetailsData & AssetEETemplate;
}

export interface PlainAssetData extends AssetDetailsData, AssetEETemplate {
  id?: number;
  itemName: string;
  purchaseDate: string;
}

export const defaultAssetData: PlainAssetData = {
  itemName: "",
  purchaseDate: "",
  code: "",
  quantity: 0,
  brand: "",
  model: "",
  serialNumber: "",
  provider: "",
  unitValue: 0,
  totalValue: 0,
  depreciationTime: 0,
  residualValue: 0,
  annualDepreciation: 0,
  monthlyDepreciation: 0,
  valueBooks: 0,
  state: "",
  active: false,
  responsible: "",
  ubication: "",
  type: AssetTypeConfig.ElectronicEquipment,
};

// export const defaultAssetData: PlainAssetData = {
//   itemName: "item1",
//   purchaseDate: "2012-12-12",
//   code: "123123",
//   quantity: 1,
//   brand: "Brand",
//   model: "model",
//   serialNumber: "slakñdjfñasl",
//   provider: "prov1",
//   unitValue: 1,
//   totalValue: 1,
//   depreciationTime: 1,
//   residualValue: 1,
//   annualDepreciation: 1,
//   monthlyDepreciation: 1,
//   valueBooks: 1,
//   state: "new",
//   active: false,
//   responsible: "asdfs",
//   ubication: "office",
//   type: AssetTypeConfig.ElectronicEquipment,
// };
