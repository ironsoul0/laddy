export enum NotificationsActionTypes {
  HIDE_NOTIFICATION = "@@notifications/HIDE",
  SUCCESS_NOTIFICATION = "@@notifications/SUCCESS",
  ERROR_NOTIFICATION = "@@notifications/ERROR",
  LOADING_NOTIFICATION = "@@notifications/LOADING"
}

export enum NotificationType {
  SUCCESS = "success",
  ERROR = "error",
  LOADING = "loading",
  NONE = "none"
}

export interface NotificationsState {
  readonly visible: boolean;
  readonly type: NotificationType;
  readonly text: string;
}
