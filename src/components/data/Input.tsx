import React from "react";

import styled from "../../utils/styled";

interface InputProps {
  value: string;
  label: string;
  disabled: boolean;
  password: boolean;
}

const Input: React.FC<InputProps> = ({ value, label, disabled, password }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <InputBox
        disabled={disabled}
        value={value}
        type={password ? "password" : "text"}
      />
    </Container>
  );
};

export default Input;

const Container = styled.div`
  &:nth-of-type(1) {
    margin-top: 5px;
  }
`;

const Label = styled.p`
  font-size: 19px;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 10px;
`;

const InputBox = styled.input`
  border: 1px solid ${props => props.theme.colors.black};
  border-radius: 5px;
  font-size: 16px;
  padding: 7px 15px;
  width: 280px;
  margin: 0 auto;

  &,
  &:focus,
  &:hover {
    outline: none;
  }
`;
