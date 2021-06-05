import axiosApiIntances from "../../utils/axios";

export const foundUserByEmail = (search) => {
  return {
    type: "FOUND_USER_EMAIL",
    payload: axiosApiIntances.get(`/user?search=${search}`),
  };
};

export const addFriendContact = (setData, id) => {
  return {
    type: "ADD_CONTACT",
    payload: axiosApiIntances.post(`/contact/${id}`, setData),
  };
};

export const deleteContact = (idUser, idFriend) => {
  return {
    type: "DELETE_CONTACT",
    payload: axiosApiIntances.delete(`/contact/${idUser}?idFriend=${idFriend}`),
  };
};

export const getAllcontact = (id, search) => {
  return {
    type: "GET_CONTACT",
    payload: axiosApiIntances.get(`/contact/${id}?search=${search}`),
  };
};

export const getContactId = (id, form) => {
  return {
    type: "GET_CONTACT_ID",
    payload: axiosApiIntances.get(`/contact/${id}`, form),
  };
};
