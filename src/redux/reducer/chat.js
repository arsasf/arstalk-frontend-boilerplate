const initialState = {
  chat: [],
  chatId: [],
  isLoading: false,
  isError: false,
  msg: "",
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case "GET_HISTORY_CHAT_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_HISTORY_CHAT_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        chat: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_HISTORY_CHAT_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        chat: [],
        msg: action.payload.response.data.msg,
      };

    case "GET_HISTORY_CHAT_ID_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_HISTORY_CHAT_ID_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        chatId: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_HISTORY_CHAT_ID_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        chatId: [],
        msg: action.payload.response.data.msg,
      };
    case "SEND_CHAT_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "SEND_CHAT_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "SEND_CHAT_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default chat;
