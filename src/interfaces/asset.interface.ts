import { Catalog } from "./catalog.interface";
import { AssetActive } from "./enums/assetActive";
import { userSignUpData } from "./userSignUpData.interface";

export interface AssetData {
  id: number;
  name: string;
  details: {
    assetType: string;
    brand: string;
    responsible: string;
    responsibleName: string | undefined;
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
  users?: userSignUpData[];
  catalog: Catalog;
}

export interface AssetPlainData {
  name: string;
  purchaseDate: string;
  assetType: string;
  brand: string;
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

export const defaultAssetData: AssetPlainData = {
  name: "",
  purchaseDate: "",
  assetType: "",
  brand: "",
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
