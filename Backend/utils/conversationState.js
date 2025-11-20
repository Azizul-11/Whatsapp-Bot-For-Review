const state = {};

export const getState = (phone) => {
  return state[phone];
};

export const setState = (phone, data) => {
  state[phone] = data;
};

export const clearState = (phone) => {
  delete state[phone];
};
