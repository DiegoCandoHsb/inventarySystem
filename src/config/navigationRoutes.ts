const basePath = "/";

export const NavigationRoutes = {
  // base
  basePath,

  // pages
  homePath: basePath.concat(),

  // profile
  profilePath: basePath.concat("profile/"),

  // expenses
  expensesPath: basePath.concat("expenses/"),

  // activies
  fixedAssetsPath: basePath.concat("activities/"),

  get elecEquiPath() {
    return this.fixedAssetsPath.concat("electronicEquipment/");
  },

  get furnAndMixPath() {
    return this.fixedAssetsPath.concat("furnitureAndMixtures/");
  },

  // human resoruces
  get humanResourcesPath() {
    return this.basePath.concat("humanResouces");
  },

  // auth
  authBasePath: "/auth/",
  get login() {
    return this.authBasePath.concat("login/");
  },

  get register() {
    return this.authBasePath.concat("register/");
  },
};
