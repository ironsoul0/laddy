import { Reducer } from "redux";

import {
  NotificationsState,
  NotificationsActionTypes as actionTypes,
  NotificationType
} from "./types";

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
        visible: false,
        type: NotificationType.NONE,
        text: ""
      };
    }
    case actionTypes.LOADING_NOTIFICATION: {
      return {
        ...state,
        visible: true,
        type: NotificationType.LOADING,
        text: action.data || "Loading..."
      };
    }
    case actionTypes.SUCCESS_NOTIFICATION: {
      return {
        ...state,
        visible: true,
        type: NotificationType.SUCCESS,
        text: action.data || "Success!"
      };
    }
    case actionTypes.WARNING_NOTIFICATION: {
      return {
        ...state,
        visible: true,
        type: NotificationType.WARNING,
        text: action.data || "Error!"
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as notificationsReducer };
