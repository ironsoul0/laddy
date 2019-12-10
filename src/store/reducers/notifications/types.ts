export enum NotificationsActionTypes {
  HIDE_NOTIFICATION = "@@notifications/HIDE",
  SUCCESS_NOTIFICATION = "@@notifications/SUCCESS",
  WARNING_NOTIFICATION = "@@notifications/WARNING",
  LOADING_NOTIFICATION = "@@notifications/LOADING"
}

export enum NotificationType {
  SUCCESS = "success",
  WARNING = "warning",
  LOADING = "loading",
  NONE = "none"
}

export interface NotificationsState {
  readonly visible: boolean;
  readonly type: NotificationType;
  readonly text: string;
}
