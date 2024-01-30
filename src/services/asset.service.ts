import { AssetData, PlainAssetData } from "../interfaces/asset.interface";
import { HsbBaseApiDb, getReqConfig } from "./api.db";

export async function GetAllAssets() {
  return await HsbBaseApiDb.get<AssetData[]>("/assets", getReqConfig()).then(
    (res) => {
      const assetsList = res.data;

      const electronicEquipmentAssets = assetsList.filter(
        (asset) => asset.details.type === "EE"
      );

      const furnitureAndFixturesAssets = assetsList.filter(
        (asset) => asset.details.type === "ME"
      );
      const expensesAssets = assetsList.filter(
        (asset) => asset.details.type === "Expenses"
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

export const CreateAsset = async (
  Assetdata: PlainAssetData
): Promise<PlainAssetData> => {
  // delete Assetdata.id;

  const asset = await HsbBaseApiDb.post<PlainAssetData>(
    "assets",
    Assetdata,
    getReqConfig()
  );
  return asset.data;
};

export async function UpdateAsset({
  id,
  ...assetData
}: PlainAssetData): Promise<PlainAssetData> {
  const res = await HsbBaseApiDb.patch<PlainAssetData>(
    `assets/${id!}`,
    {
      ...assetData,
    },
    getReqConfig()
  );

  return res.data;
}
