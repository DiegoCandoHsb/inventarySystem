import * as reactJWT from "react-jwt";

import { TokenPayload } from "../../interfaces/toke.interface";
import { getTokenFromLs } from "../tokenMng/tokenMng";
import { getUser } from "../../services/user.service";
import { userSignUpData } from "../../interfaces/userSignUpData.interface";

export async function ProfileLoader(): Promise<userSignUpData> {
  const token: TokenPayload = reactJWT.decodeToken(getTokenFromLs() ?? "")!;
  const userData = await getUser(token.id);
  return userData;
}
