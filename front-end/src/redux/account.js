import * as accountService from "../services/account.service";
import type { User } from "../models/user";

const GET_ACCOUNT_INFO = "get_account_info";

const initialState = {
  user: null
};

export function loadAccountInfo(): Function {
  return function (dispatch: Function, getState: Function) {

    let getAccountPromise: Promise<User> = null;

    if (sessionStorage.user) {
      getAccountPromise = Promise.resolve(JSON.parse(sessionStorage.user));
    }
    else {
      getAccountPromise = new Promise((resolve) => {
        accountService.getAccountInfo()
          .then(user => {
            sessionStorage.user = JSON.stringify(user);
            resolve(user);
          });
      });
    }

    return getAccountPromise
      .then(user => dispatch({
        type: GET_ACCOUNT_INFO,
        user
      }))
      .catch((error) => console.warn("Error in loadAccountInfo: ", error))
  }
}

export function account(state = initialState, action) {
  switch (action.type) {
    case GET_ACCOUNT_INFO:
      return {
        ...state,
        user: action.user
      };
    default:
      return state
  }
}