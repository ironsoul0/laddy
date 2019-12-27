import { Reducer } from "redux";

import { UserState, UserActionTypes } from "./types";

const getInitialState = () => {
  const token = localStorage.getItem("token") || "";

  return {
    token,
    loggedIn: token.length > 0
  };
};

const initialState = getInitialState();

const reducer: Reducer<UserState> = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.LOGIN: {
      return { loggedIn: true, token: action.payload };
    }
    case UserActionTypes.LOGOUT: {
      return { ...state, loggedIn: false };
    }
    default: {
      return state;
    }
  }
};

export { reducer as userReducer };
