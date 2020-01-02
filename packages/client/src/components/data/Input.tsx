import React from "react";

import styled from "../../utils/styled";
import mixins from "../../styles/mixins";

interface InputProps {
  label: string;
  disabled: boolean;
  password: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  value?: string;
  placeholder?: string;
  error?: boolean;
  success?: boolean;
  attention?: boolean;
}

const Input: React.FC<InputProps> = ({
  value,
  label,
  disabled,
  password,
  onChange,
  placeholder,
  error,
  success,
  attention,
  id
}) => {
  return (
    <Container>
      <Label>
        {label}
        {attention && <Star> *</Star>}
      </Label>
      <InputBox
        id={id}
        onChange={onChange}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        type={password ? "password" : "text"}
        error={error}
        success={success}
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

interface InputBoxProps {
  error?: boolean;
  success?: boolean;
}

const InputBox = styled.input<InputBoxProps>`
  border: 1px solid ${props => props.theme.colors.black};
  border-radius: 5px;
  font-size: 16px;
  padding: 7px 15px;
  width: 280px;
  margin: 0 auto;

  border-color: ${props => (props.error ? "red !important" : "")};
  border-color: ${props =>
    props.success ? "rgb(25, 200, 25) !important" : ""};

  &:focus {
    border-color: #007eff;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 0 3px rgba(0, 126, 255, 0.1);
  }

  ${mixins.dropDecoration};
`;

const Star = styled.span`
  color: red;
`;
