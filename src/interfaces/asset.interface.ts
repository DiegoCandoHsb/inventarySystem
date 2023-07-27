import { AssetTypeConfig } from "../config/assets.config";
import { Catalog } from "./catalog.interface";
import { AssetActive } from "./enums/assetActive";
import { userSignUpData } from "./userSignUpData.interface";

export interface AssetData {
  id?: number;
  name: string;
  details: {
    assetType: AssetTypeConfig;
    brand: string;
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
  };
  purchaseDate: string;
}

export interface AssetTypesData {
  assetsList?: AssetData[];
  electronicEquipmentAssets?: AssetData[];
  furnitureAndFixturesAssets?: AssetData[];
  users?: userSignUpData[];
  catalog?: Catalog;
}

export interface AssetPlainData {
  id?: number;
  name: string;
  purchaseDate: string;
  assetType: AssetTypeConfig;
  brand: string;
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
}

export const defaultAssetData: AssetPlainData = {
  id: 0,
  name: "",
  purchaseDate: "",
  assetType: AssetTypeConfig.ElectronicEquipment,
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
