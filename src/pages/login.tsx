import React, { useState } from "react";

import Heading from "../components/data/Heading";
import Input from "../components/data/Input";
import Nav from "../components/data/Nav";
import styled from "../utils/styled";
import Logo from "../components/icons/Logo";

const Login: React.FC = () => {
  const [isLogin, setLogin] = useState(true);

  return (
    <Container>
      <FormWrapper>
        <MainLogo />
        <IntroHeading>Join Laddy</IntroHeading>
        <Navigation
          firstTab="Login"
          secondTab="Register"
          firstIsActive={isLogin}
          setFirstActive={setLogin}
        />
        {!isLogin ? (
          <>
            <Input
              value="timka2609@gmail.com"
              label="Email"
              disabled={false}
              password={false}
            />
            <Input
              value="ironsoul"
              label="Codeforces Handle"
              disabled={false}
              password={false}
            />
            <Input
              value="kekocity"
              label="Password"
              disabled={false}
              password={true}
            />
            <Input
              value="kekocity"
              label="Confirm Password"
              disabled={false}
              password={true}
            />
            <Button>Register</Button>
          </>
        ) : (
          <>
            <Input
              value="timka2609@gmail.com"
              label="Email"
              disabled={false}
              password={false}
            />
            <Input
              value="kekocity"
              label="Password"
              disabled={false}
              password={true}
            />
            <Button>Login</Button>
          </>
        )}
      </FormWrapper>
    </Container>
  );
};

export default Login;

const Navigation = styled(Nav)`
  margin-bottom: 20px;
  width: 100%;

  & .nav-item {
    width: 140px;
  }
`;

const MainLogo = styled(Logo)`
  width: 100px;
  height: auto;
  padding: 0;
  margin-left: -10px;
`;

const FormWrapper = styled.div`
  min-height: 450px;
`;

const IntroHeading = styled(Heading)`
  font-size: 38px;
  margin-bottom: 35px;
  margin-top: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 20px 0;
`;

const Button = styled.button`
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
