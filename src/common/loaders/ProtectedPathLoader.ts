import { redirect } from "react-router-dom";
import { verifyToken } from "../../services/auth.service";
import { removeTokenToLs, saveTokenToLS } from "../tokenMng/tokenMng";

export async function PathProtectedLoader() {
  const isValidToken = await verifyToken();
  console.log("se ha verificado");

  if (typeof isValidToken === "boolean") {
    removeTokenToLs();
    redirect("/auth/login");
    return false;
  }

  saveTokenToLS(isValidToken);

  return true;
}
