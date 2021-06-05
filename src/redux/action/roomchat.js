import axiosApiIntances from "../../utils/axios";

export const addRoomChat = (idUser, idFriend) => {
  return {
    type: "ADD_ROOM_CHAT",
    payload: axiosApiIntances.post(`/roomchat/${idUser}`, idFriend),
  };
};

export const getAllRoomChat = (idUser) => {
  return {
    type: "GET_ROOM_CHAT",
    payload: axiosApiIntances.get(`/roomchat/${idUser}`),
  };
};

// export const getContactId = (id, form) => {
//   return {
//     type: "GET_CONTACT_ID",
//     payload: axiosApiIntances.get(`/contact/${id}`, form),
//   };
// };
