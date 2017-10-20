import * as Cookies from "js-cookie";

export * from "./rooms.service";
export * from "./account.service";

export const API_ROOT: string = "/api";

export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  "Accept": "application/json"
};

export function getAuthorizationHeader(): any {
  return {
    "Authorization": "bearer " + Cookies.get("jwt")
  };
}