import { Reducer } from "redux";

import {
  NotificationsState,
  NotificationsActionTypes as actionTypes,
  NotificationType
} from "./types";

// const initialState: NotificationsState = {
//   visible: false,
//   type: NotificationType.NONE,
//   text: ""
// };

const initialState: NotificationsState = {
  visible: false,
  type: NotificationType.NONE,
  text: ""
};

const reducer: Reducer<NotificationsState> = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HIDE_NOTIFICATION: {
      return {
        ...state,
        visible: false
      };
    }
    case actionTypes.LOADING_NOTIFICATION: {
      return {
        ...state,
        visible: true,
        type: NotificationType.LOADING,
        text: action.payload || "Loading..."
      };
    }
    case actionTypes.SUCCESS_NOTIFICATION: {
      return {
        ...state,
        visible: true,
        type: NotificationType.SUCCESS,
        text: action.payload || "Success!"
      };
    }
    case actionTypes.ERROR_NOTIFICATION: {
      return {
        ...state,
        visible: true,
        type: NotificationType.ERROR,
        text: action.payload || "Error!"
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as notificationsReducer };
