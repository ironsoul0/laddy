import React from "react";
import { keyframes } from "@emotion/core";
import { AiOutlineLoading as LoadingSpinner } from "react-icons/ai";

import styled from "../../utils/styled";

interface SpinnerProps {
  color: string;
  size: number;
}

const Spinner: React.FC<SpinnerProps> = props => {
  return <Container {...props} />;
};

export default Spinner;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Container = styled(LoadingSpinner)`
  animation: ${rotate} 1s linear infinite;
`;
