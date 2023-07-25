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
    const expensesAssets = assetsList.filter(
      (asset) => asset.details.assetType === "Expenses"
    );

    return {
      assetsList,
      electronicEquipmentAssets,
      furnitureAndFixturesAssets,
      expensesAssets,
    };
  });
}

export const CreateAsset = async (data: AssetData): Promise<AssetData> => {
  // try {
  const asset = await HsbBaseApiDb.post<AssetData>("assets", data);

  return asset.data;

  // } catch (error: any) {
  // alert(error.response.data.message);
  // }
};
