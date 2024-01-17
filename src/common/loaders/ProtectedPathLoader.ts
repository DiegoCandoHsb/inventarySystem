import { redirect } from "react-router-dom";
import { verifyToken } from "../../services/auth.service";
import { removeTokenToLs, saveTokenToLS } from "../tokenMng/tokenMng";

export async function PathProtectedLoader(autoRedirectToLogin = false) {
  const isValidToken = await verifyToken();
  console.log("se ha verificado");

  if (typeof isValidToken === "boolean") {
    removeTokenToLs();
    return !autoRedirectToLogin ? false : redirect("/auth/login");
  }

  saveTokenToLS(isValidToken);

  return true;
}
