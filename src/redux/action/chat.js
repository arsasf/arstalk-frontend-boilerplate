import axiosApiIntances from "../../utils/axios";

export const sendChat = (idUser, form) => {
  return {
    type: "SEND_CHAT",
    payload: axiosApiIntances.post(`/chat/${idUser}`, form),
  };
};

export const getHistoryChat = (idUser) => {
  return {
    type: "GET_HISTORY_CHAT",
    payload: axiosApiIntances.get(`/chat/${idUser}`),
  };
};

export const getHistoryChatById = (id, room) => {
  // console.log(id, room);
  return {
    type: "GET_HISTORY_CHAT_ID",
    payload: axiosApiIntances.get(`/chat/room/${id}`, room),
  };
};
