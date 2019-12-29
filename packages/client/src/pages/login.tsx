import React, { useState } from "react";

import RegisterForm from "../components/forms/RegisterForm";
import LoginForm from "../components/forms/LoginForm";
import Centered from "../components/data/Centered";
import Heading from "../components/data/Heading";
import Nav from "../components/data/Nav";
import Logo from "../components/icons/Logo";

import styled from "../utils/styled";

const Login: React.FC = () => {
  const [isLogin, setLogin] = useState(true);

  return (
    <Body>
      <Centered>
        <FormWrapper>
          <MainLogo />
          <IntroHeading>Join Laddy</IntroHeading>
          <Navigation
            firstTab="Login"
            secondTab="Register"
            firstIsActive={isLogin}
            setFirstActive={setLogin}
          />
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </FormWrapper>
      </Centered>
    </Body>
  );
};

export default Login;

const Body = styled.div`
  overflow-y: scroll;
  min-height: 100%;
`;

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
  min-height: 500px;
`;

const IntroHeading = styled(Heading)`
  font-size: 38px;
  margin-bottom: 35px;
  margin-top: 10px;
`;
