import { AssetData } from "../interfaces/asset.interface";
import { HsbBaseApiDb, getReqConfig } from "./api.db";

export async function GetAllAssets() {
  return await HsbBaseApiDb.get<AssetData[]>("/assets", getReqConfig()).then(
    (res) => {
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
    }
  );
}

export const CreateAsset = async ({
  id,
  ...Assetdata
}: AssetData): Promise<AssetData> => {
  const asset = await HsbBaseApiDb.post<AssetData>(
    "assets",
    Assetdata,
    getReqConfig()
  );
  return asset.data;
};

export async function UpdateAsset({
  id,
  ...assetData
}: AssetData): Promise<AssetData> {
  const res = await HsbBaseApiDb.patch<AssetData>(
    `assets/${id!}`,
    {
      ...assetData,
    },
    getReqConfig()
  );

  return res.data;
}
