/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AssetConfig, AssetTypeConfig } from "../config/assets.config";
import { Catalog } from "./catalog.interface";
import { AssetActive } from "./enums/assetActive";
import { AssetUbication } from "./enums/assetUbication.enum";
import { userSignUpData } from "./userSignUpData.interface";

export interface AssetData {
  id?: number;
  name: string;
  details: {
    assetType: AssetTypeConfig;
    brand: string;
    serialNumber: string;
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
    ubication: AssetUbication
  };
  purchaseDate: string;
}

export interface AssetTypesData {
  assetsList?: AssetData[];
  electronicEquipmentAssets?: AssetData[];
  furnitureAndFixturesAssets?: AssetData[];
  expensesAssets?: AssetData[];
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
  ubication: AssetUbication
}

export const defaultAssetData: AssetPlainData = {
  id: 0,
  name: "",
  purchaseDate: "",
  assetType: " " as AssetTypeConfig,
  serialNumber: "",
  brand: "",
  model: "",
  color: "",
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
  ubication: AssetUbication.Office
};
