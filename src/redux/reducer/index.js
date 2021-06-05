import { combineReducers } from "redux";

import counter from "./counter";
import auth from "./auth";
import user from "./user";
import contact from "./contact";
import roomchat from "./roomchat";
import chat from "./chat";

export default combineReducers({
  counter,
  auth,
  user,
  contact,
  roomchat,
  chat,
});
