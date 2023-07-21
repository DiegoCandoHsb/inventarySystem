import { AssetActive } from "./enums/assetActive";

export interface AssetData {
  id: number;
  name: string;
  details: {
    assetType: string;
    responsible: string;
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
  };
  purchaseDate: string;
}

export interface AssetTypesData {
  assetsList: AssetData[];
  electronicEquipmentAssets: AssetData[];
  furnitureAndFixturesAssets: AssetData[];
}

export interface AssetPlainData {
  name: string;
  purchaseDate: string;
  assetType: string;
  responsible: string;
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
}

export const defaultAssetData = {
  name: "",
  purchaseDate: "",
  assetType: "",
  responsible: "",
  supplier: "",
  value: 0,
  depreciationTime: 0,
  residualValue: 0,
  annualDepreciation: 0,
  monthlyDepreciation: 0,
  valueBooks: 0,
  observation: "",
  insured: 0,
  active: AssetActive.new,
};
