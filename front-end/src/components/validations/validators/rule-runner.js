import { Map } from "immutable";

export const ruleRunner = (field: String, name: String, ...validations) => {
  return (state: Map) => {
    for (let v of validations) {
      let errorMessageFunc = v(state.get(field), state);
      if (errorMessageFunc) {
        return {[field]: errorMessageFunc(name)};
      }
    }
    return null;
  };
};

export const run = (state: Map, runners) => {
  return runners.reduce((memo, runner) => {
    return Object.assign(memo, runner(state));
  }, {});
};
