import { redirect } from "react-router-dom";
import { PathProtectedLoader } from "./ProtectedPathLoader";

export async function conbinedLoaders(loader?: () => Promise<any>) {
  if (!loader) {
    return await PathProtectedLoader();
  }

  const validToken = await PathProtectedLoader();

  if (!validToken) {
    return redirect("/auth/login");
  }

  return loader();
}
