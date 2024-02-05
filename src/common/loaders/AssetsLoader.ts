import {
  AssetTypeConfig,
  ElectronicEquipmentConfig,
} from "../../config/assets.config";
import { GetAllAssets, getEspecificAssets } from "../../services/asset.service";
import { GetCatalog } from "../../services/catalog.service";
import { GetUsers } from "../../services/user.service";

export async function AssetDataLoader(assetType: AssetTypeConfig) {
  // const data = await GetAllAssets();

  const assets = await getEspecificAssets(assetType);
  const users = await GetUsers();
  const catalogs = await GetCatalog();

  let catalog = catalogs.filter(
    (ctlg) =>
      ctlg.catalogName === ElectronicEquipmentConfig.assetBrandCatalogName
  )[0];

  if (!catalog) {
    catalog = { catalogName: "", catalogOptions: [] };
  }

  return {
    assets,
    users,
    catalog,
  };
}
