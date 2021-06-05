const initialState = {
  roomchat: [],
  isLoading: false,
  isError: false,
  msg: "",
};

const roomchat = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ROOM_CHAT_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_ROOM_CHAT_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        roomchat: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_ROOM_CHAT_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        roomchat: [],
        msg: action.payload.response.data.msg,
      };
    case "ADD_ROOM_CHAT_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "ADD_ROOM_CHAT_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "ADD_ROOM_CHAT_REJECTED":
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

export default roomchat;
