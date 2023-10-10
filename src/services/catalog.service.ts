import { Catalog } from "../interfaces/catalog.interface";
import { HsbBaseApiDb, getReqConfig } from "./api.db";

export async function GetCatalog() {
  const res = await HsbBaseApiDb.get<Catalog[]>("/catalog", getReqConfig());

  return res.data;
}

// export async function CreateCatalogOption(params: type) {}
