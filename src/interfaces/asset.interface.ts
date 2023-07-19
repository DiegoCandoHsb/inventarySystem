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
    anualDepreciation: number;
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

export interface AssetPlainData{
    name: string;
    purchaseDate: string;
    assetType: string;
    responsible: string;
    supplier: string;
    value: number;
    depreciationTime: number;
    residualValue: number;
    anualDepreciation: number;
    monthlyDepreciation: number;
    valueBooks: number;
    observation: string;
    insured: number;
    active: AssetActive;
}
