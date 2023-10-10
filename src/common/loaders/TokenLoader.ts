import { verifyToken } from "../../services/auth.service";
import { redirect } from "react-router-dom";

export default async function TokenLoader(): Promise<boolean | Response> {
  const isValidToken = await verifyToken();

  if (isValidToken) return redirect("/");

  return !isValidToken;
}
