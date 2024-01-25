import axios, { AxiosRequestConfig } from "axios";
import { getTokenFromLs } from "../common/tokenMng/tokenMng";

const baseURL: string =
  (import.meta.env.VITE_BACKEND_URL as string) ||
  `https://${import.meta.env.VITE_BACKEND_IP as string}:3000/api/v1`;
export const HsbBaseApiDb = axios.create({
  baseURL,
});

export function getReqConfig(): AxiosRequestConfig {
  const headers = {
    Authorization: `Bearer ${getTokenFromLs() || ""}`,
  };

  return {
    headers,
  };
}
