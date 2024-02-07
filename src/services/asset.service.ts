import {
  FormatedAssetData,
  PlainAssetData,
} from "../interfaces/asset.interface";
import { HsbBaseApiDb, getReqConfig } from "./api.db";

export async function GetAllAssets() {
  return await HsbBaseApiDb.get<FormatedAssetData[]>(
    "/assets",
    getReqConfig()
  ).then((res) => {
    const assetsList = res.data;

    const electronicEquipmentAssets = assetsList.filter(
      (asset) => asset.details.type === "EE"
    );

    const furnitureAndFixturesAssets = assetsList.filter(
      (asset) => asset.details.type === "ME"
    );

    return {
      assetsList,
      electronicEquipmentAssets,
      furnitureAndFixturesAssets,
    };
  });
}

export async function getEspecificAssets(
  assetType: string
): Promise<FormatedAssetData[]> {
  return await HsbBaseApiDb.get<FormatedAssetData[]>(
    "/assets".concat("/", assetType),
    getReqConfig()
  ).then(({ data }) => {
    return data;
  });
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

export async function downdloadFile(
  assets: PlainAssetData[],
  fileName: string
): Promise<string> {
  const res = await HsbBaseApiDb.post<string>(
    `assets/download`,
    {
      assets,
      fileName,
    },
    getReqConfig()
  );

  return res.data;
}

export async function uploadFile(file: object) {
  const res = await HsbBaseApiDb.post<string>(
    "http://localhost:3000/api/v1/assets/upload",
    file,
    getReqConfig()
  );

  return res.data;
}
