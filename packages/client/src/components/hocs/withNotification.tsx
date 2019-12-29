import React from "react";
import { connect } from "react-redux";

import {
  showNotification,
  hideNotification
} from "../../store/reducers/notifications/actions";
import { NotificationsActionTypes } from "../../store/reducers/notifications/types";

export interface WithNoficationProps {
  showLoading: () => void;
  showSuccess: (data?: string) => void;
  showError: (data?: string) => void;
}

const mapDispatchToProps = {
  showNotification,
  hideNotification
};

const withNofication = (WrappedComponent: any) => {
  const wrappedComponent: React.FC<any> = props => {
    const showLoading = () => {
      props.showNotification(NotificationsActionTypes.LOADING_NOTIFICATION);
    };

    const showSuccess = (data?: string) => {
      props.showNotification(
        NotificationsActionTypes.SUCCESS_NOTIFICATION,
        data
      );
      setTimeout(() => props.hideNotification(), 2000);
    };

    const showError = (data?: string) => {
      props.showNotification(NotificationsActionTypes.ERROR_NOTIFICATION, data);
      setTimeout(() => props.hideNotification(), 2000);
    };

    return (
      <WrappedComponent
        showLoading={showLoading}
        showSuccess={showSuccess}
        showError={showError}
        {...props}
      />
    );
  };

  return connect(null, mapDispatchToProps)(wrappedComponent);
};

export default withNofication;
