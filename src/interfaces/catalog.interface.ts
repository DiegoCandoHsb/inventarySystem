export interface CatalogOption {
  id: number;
  catalogDetail: string;
}

export interface Catalog {
  catalogName: string;
  catalogOptions: CatalogOption[];
}
