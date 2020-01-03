import React from "react";
import PropTypes from "prop-types";
import Div100vh from "react-div-100vh";

import Notification from "../data/Notification";
import styled from "../../utils/styled";
import ForkMe from "../data/ForkMe";

interface RootProps {
  className?: string;
  children?: React.ReactNode;
}

const Root: React.FC<RootProps> = ({ children }) => {
  return (
    <Wrapper>
      <ForkMe />
      <Notification />
      {children}
    </Wrapper>
  );
};

Root.propTypes = {
  children: PropTypes.node.isRequired
};

export default Root;

const Wrapper = styled(Div100vh)`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.body};
  font-family: ${props => props.theme.fonts.body};
`;
