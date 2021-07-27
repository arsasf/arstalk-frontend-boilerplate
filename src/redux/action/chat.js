import axiosApiIntances from "../../utils/axios";

export const sendChat = (form) => {
  return {
    type: "SEND_CHAT",
    payload: axiosApiIntances.post(`/chat/`, form),
  };
};

export const getHistoryChat = (idUser) => {
  return {
    type: "GET_HISTORY_CHAT",
    payload: axiosApiIntances.get(`/chat/${idUser}`),
  };
};

export const getHistoryChatById = (id) => {
  return {
    type: "GET_HISTORY_CHAT_ID",
    payload: axiosApiIntances.get(`/chat/room/${id}`),
  };
};
