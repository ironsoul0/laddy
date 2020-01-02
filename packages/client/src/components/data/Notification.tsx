import React from "react";
import { connect } from "react-redux";
import {
  AiFillCheckCircle as SuccessIcon,
  AiFillCloseCircle as ErrorIcon
} from "react-icons/ai";

import { ApplicationState } from "../../store/reducers";
import Spinner from "../icons/Spinner";
import styled from "../../utils/styled";
import {
  NotificationsState,
  NotificationType
} from "../../store/reducers/notifications/types";

interface NotificationProps {
  notifications: NotificationsState;
}

const icons = {
  [NotificationType.LOADING]: <Spinner size={18} color="#178FFF" />,
  [NotificationType.SUCCESS]: <SuccessIcon size={18} color="#53C41A" />,
  [NotificationType.ERROR]: <ErrorIcon size={18} color="#F5212D" />,
  [NotificationType.NONE]: null
};

const Notification: React.FC<NotificationProps> = ({ notifications }) => {
  const { visible, type, text } = notifications;

  return (
    <Container visible={visible}>
      {icons[type]}
      <Text>{text}</Text>
    </Container>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  notifications: state.notifications
});

export default connect(mapStateToProps)(Notification);

interface ContainerProps {
  visible: boolean;
}

const Container = styled.div<ContainerProps>`
  position: absolute;
  min-width: 180px;
  padding: 0 15px;
  height: 40px;
  border-radius: 5px;
  background-color: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  left: calc(50% - 90px);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 2;
  top: ${props => (props.visible ? "15px" : "-100px")};
  transition: top 0.3s linear;
`;

const Text = styled.p`
  font-size: 15px;
  margin-left: 9px;
  opacity: 0.9;
`;
