import React, { useState } from "react";

import FormButton from "../components/data/FormButton";
import Centered from "../components/data/Centered";
import Heading from "../components/data/Heading";
import Input from "../components/data/Input";
import Nav from "../components/data/Nav";
import styled from "../utils/styled";
import Logo from "../components/icons/Logo";

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
              <FormButton>Register</FormButton>
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
              <FormButton>Login</FormButton>
            </>
          )}
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
  min-height: 600px;
`;

const IntroHeading = styled(Heading)`
  font-size: 38px;
  margin-bottom: 35px;
  margin-top: 10px;
`;
