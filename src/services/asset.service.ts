import { AssetData } from "../interfaces/asset.interface";
import { HsbBaseApiDb } from "./api.db";

export async function GetAllAssets() {
  return await HsbBaseApiDb.get<AssetData[]>("/assets").then((res) => {
    const assetsList = res.data;

    const electronicEquipmentAssets = assetsList.filter(
      (asset) => asset.details.assetType === "ElectronicEquipment"
    );

    const furnitureAndFixturesAssets = assetsList.filter(
      (asset) => asset.details.assetType === "FurnitureAndFixtures"
    );

    return {
      assetsList,
      electronicEquipmentAssets,
      furnitureAndFixturesAssets,
    };
  });
}
