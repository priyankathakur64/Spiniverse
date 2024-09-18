import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userListReducer,
  userUpdateSpinsReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userUpdateSpins: userUpdateSpinsReducer,
  userUpdateProfile: userUpdateProfileReducer,
});

const safeParseJSON = (item) => {
  try {
    return JSON.parse(item);
  } catch (error) {
    console.error("Error parsing JSON from localStorage", error);
    return null; // or an appropriate default value
  }
};

const userInfoFromStorage = safeParseJSON(
  localStorage.getItem("walletAddress")
);

// const userInfoFromStorage = localStorage.getItem("walletAddress")
//   ? JSON.parse(localStorage.getItem("walletAddress"))
//   : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
