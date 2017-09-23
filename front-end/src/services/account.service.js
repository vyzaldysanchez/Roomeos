import type { User } from "../models/user";
import { API_ROOT, DEFAULT_HEADERS, getAuthorizationHeader } from "./index";

export async function getAccountInfo(): Promise<User> {
  try {
    const response = await fetch(API_ROOT + "/account", {
      headers: {...DEFAULT_HEADERS, ...getAuthorizationHeader()},
      method: "GET"
    });
    const account = await response.json();
    return Promise.resolve(account);
  }
  catch (error) {
    return Promise.reject(error);
  }
}