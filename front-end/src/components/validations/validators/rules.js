import * as ErrorMessages from "./error-messages";

export const required = (text: String) => {
  if (text) {
    return null;
  } else {
    return ErrorMessages.isRequired;
  }
};

export const mustMatch = (field: String, fieldName: String) => {
  return (text, state) => {
    return state[field] === text ? null : ErrorMessages.mustMatch(fieldName);
  };
};

export const minLength = (length: Number) => {
  return (text) => {
    return text.length >= length ? null : ErrorMessages.minLength(length);
  };
};

export const maxLength = (length: Number) => {
  return (text) => {
    return text.length <= length ? null : ErrorMessages.maxLength(length);
  };
};