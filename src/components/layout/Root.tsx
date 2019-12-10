import React from "react";
import PropTypes from "prop-types";

import Notification from "../data/Notification";
import styled from "../../utils/styled";

interface RootProps {
  className?: string;
  children?: React.ReactNode;
}

const Root: React.FC<RootProps> = ({ children }) => {
  return (
    <Wrapper>
      <Notification />
      {children}
    </Wrapper>
  );
};

Root.propTypes = {
  children: PropTypes.node.isRequired
};

export default Root;

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.body};
  font-family: ${props => props.theme.fonts.body};
`;
