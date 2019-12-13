import { action } from "typesafe-actions";

import { NotificationsActionTypes } from "./types";

export const showNotification = (
  type: NotificationsActionTypes,
  data?: string
) => action(type, data);

export const hideNotification = (data?: string) =>
  action(NotificationsActionTypes.HIDE_NOTIFICATION, data);
