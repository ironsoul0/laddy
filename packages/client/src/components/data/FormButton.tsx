import React from "react";

import styled from "../../utils/styled";

interface FormButtonProps {
  disabled?: boolean;
}

const FormButton: React.FC<FormButtonProps> = ({ disabled }) => {
  return (
    <Container disabled={disabled} type="submit">
      Submit
    </Container>
  );
};

const Container = styled.button`
  color: ${props => props.theme.colors.black};
  font-size: 18px;
  border: none;
  background-color: ${props => props.theme.colors.yellow};
  width: 280px;
  border-radius: 10px;
  padding: 14px 0;
  margin-top: 30px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed !important;
  }

  &:hover,
  &:focus,
  &:active {
    cursor: pointer;
    outline: none;
  }
`;

export default FormButton;
