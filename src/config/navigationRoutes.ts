const basePath = "/";

export const NavigationRoutes = {
  // base
  basePath,
  // pages
  homePath: basePath.concat(),
  expensesPath: basePath.concat("expenses/"),
  // activies
  fixedAssetsPath: basePath.concat("activities/"),
  get elecEquiPath() {
    return this.fixedAssetsPath.concat("electronicEquipment/");
  },
  get furnAndMixPath() {
    return this.fixedAssetsPath.concat("furnitureAndMixtures/");
  },
  // auth
  authBasePath: "auth/",
  get login() {
    return this.authBasePath.concat('login/')
  },
  get register() {
    return this.authBasePath.concat('register/')
  }
};
