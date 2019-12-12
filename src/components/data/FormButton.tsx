import styled from "../../utils/styled";

const FormButton = styled.button`
  color: ${props => props.theme.colors.black};
  font-size: 18px;
  border: none;
  background-color: ${props => props.theme.colors.yellow};
  width: 280px;
  border-radius: 10px;
  padding: 14px 0;
  margin-top: 30px;

  &:hover,
  &:focus,
  &:active {
    cursor: pointer;
    outline: none;
  }
`;

export default FormButton;
