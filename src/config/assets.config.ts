/* eslint-disable @typescript-eslint/no-unsafe-return */
export const AssetConfig = {
  decimalQuantity: 2,
  valuePrefix: "$",

  dialogCreateTitle: "Create Asset",
  dialogUpdateTitle: "Update Asset",
  defaultHeaderTitle: "Create Asset",
  setDialogHeaderTitle: function (option: "create" | "update") {
    switch (option) {
      case "create":
        return (this.defaultHeaderTitle = this.dialogCreateTitle);
      case "update":
        return (this.defaultHeaderTitle = this.dialogUpdateTitle);
      default:
        return (this.defaultHeaderTitle = this.dialogCreateTitle);
    }
  },

  electronicEquipment: "Electronic-Equipment",
  furnitureAndFixture: "Furniture&Fixtures",
};

export const ElectronicEquipmentConfig = {
  assetBrandCatalogName: "Brands",

  electronicEquipmentType: "ElectronicEquipment",
  furnitureAndFixtureType: "FurnitureAndFixtures",
  expensesType: "Expenses",
};

export const FurnitureAndFixturesConfig = {};

export enum AssetTypeConfig {
  ElectronicEquipment = "ElectronicEquipment",
  FurnitureAndFixtures = "FurnitureAndFixtures",
  Expenses = "Expenses",
}
