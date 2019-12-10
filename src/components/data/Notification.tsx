import React, { useState } from "react";

import Spinner from "../data/Spinner";
import styled from "../../utils/styled";

const Notification: React.FC = () => {
  const [shown, setShown] = useState(true);

  return (
    <Container visible={shown} onClick={() => setShown(!setShown)}>
      <Spinner size={18} color="black" />
      <p>kekocity</p>
    </Container>
  );
};

export default Notification;

interface ContainerProps {
  visible: boolean;
}

const Container = styled.div<ContainerProps>`
  position: absolute;
  width: 190px;
  height: 40px;
  border-radius: 5px;
  background-color: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  left: calc(50% - 95px);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 2;
  top: ${props => (props.visible ? "15px" : "-100px")};
  transition: top 0.3s linear;
`;
