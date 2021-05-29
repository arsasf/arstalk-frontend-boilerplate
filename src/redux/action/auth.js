import axiosApiIntances from "../../utils/axios";

export const login = (data) => {
  return {
    type: "LOGIN",
    payload: axiosApiIntances.post("auth/login", data),
  };
};

export const register = (data) => {
  return {
    type: "REGISTER",
    payload: axiosApiIntances.post("auth/register", data),
  };
};

export const verify = (id) => {
  return {
    type: "VERIFY",
    payload: axiosApiIntances.get(`auth/verify/${id}`),
  };
};
