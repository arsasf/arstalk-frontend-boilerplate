const initialState = {
  contact: [],
  isLoading: false,
  isError: false,
  msg: "",
  search: "",
};

const contact = (state = initialState, action) => {
  switch (action.type) {
    case "FOUND_USER_EMAIL_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FOUND_USER_EMAIL_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        contact: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "FOUND_USER_EMAIL_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        contact: [],
        msg: action.payload.response.data.msg,
      };
    case "GET_CONTACT_ID_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_CONTACT_ID_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        contact: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_CONTACT_ID_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        contact: [],
        msg: action.payload.response.data.msg,
      };
    case "GET_CONTACT_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_CONTACT_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        // search:
        contact: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_CONTACT_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        contact: [],
        msg: action.payload.response.data.msg,
      };
    case "ADD_CONTACT_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "ADD_CONTACT_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "ADD_CONTACT_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    case "DELETE_CONTACT_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "DELETE_CONTACT_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "DELETE_CONTACT_REJECTED":
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

export default contact;
