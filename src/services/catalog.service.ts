import { Catalog } from "../interfaces/catalog.interface";
import { HsbBaseApiDb } from "./api.db";

export async function GetCatalog() {
  const res = await HsbBaseApiDb.get<Catalog[]>("/catalog");

  return res.data;
}

// export async function CreateCatalogOption(params: type) {}
