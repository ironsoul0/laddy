import styled from "../../utils/styled";

const Wrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.widths.lg};
  margin: 0 auto;

  @media screen and (max-width: ${props => props.theme.widths.lg}) {
    padding: 0 30px;
  }
`;

export default Wrapper;
