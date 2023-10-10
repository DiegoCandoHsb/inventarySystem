import { redirect } from "react-router-dom";
import { verifyToken } from "../../services/auth.service";
import { removeTokenToLs } from "../tokenMng/tokenMng";

export async function PathProtectedLoader() {
  const isValidToken = await verifyToken();

  if (!isValidToken) {
    removeTokenToLs();
    return redirect("/auth/login");
  }

  return isValidToken;
}
