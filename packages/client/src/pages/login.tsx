import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import FormButton from "../components/data/FormButton";
import Centered from "../components/data/Centered";
import Heading from "../components/data/Heading";
import Input from "../components/data/Input";
import Nav from "../components/data/Nav";
import styled from "../utils/styled";
import Logo from "../components/icons/Logo";

const LoginForm = () => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string().required()
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 1000);
      }}
    >
      {props => {
        const {
          values,
          errors,
          initialValues,
          isSubmitting,
          handleChange,
          handleSubmit
        } = props;

        const hasChanged =
          JSON.stringify(values) !== JSON.stringify(initialValues);
        const hasErrors = Object.keys(errors).length > 0;

        return (
          <form onSubmit={handleSubmit}>
            <Input
              id="email"
              placeholder="laddy@app.com"
              label="Email"
              disabled={false}
              password={false}
              error={values.email !== initialValues.email && !!errors.email}
              success={values.email !== initialValues.email && !errors.email}
              onChange={handleChange}
              value={values.email}
            />
            <Input
              id="password"
              placeholder="Shhh..."
              label="Password"
              disabled={false}
              password={true}
              error={
                values.password !== initialValues.password && !!errors.password
              }
              success={
                values.password !== initialValues.password && !errors.password
              }
              onChange={handleChange}
              value={values.password}
            />
            <FormButton disabled={!hasChanged || hasErrors || isSubmitting}>
              Login
            </FormButton>
          </form>
        );
      }}
    </Formik>
  );
};

const RegisterForm = () => {
  return (
    <Formik
      initialValues={{
        email: "",
        handle: "",
        password: "",
        confirmPassword: ""
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
        handle: Yup.string().required(),
        password: Yup.string().required(),
        confirmPassword: Yup.string().required()
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 1000);
      }}
    >
      {props => {
        const {
          values,
          errors,
          initialValues,
          isSubmitting,
          handleChange,
          handleSubmit
        } = props;

        const hasChanged =
          JSON.stringify(values) !== JSON.stringify(initialValues);
        const hasErrors =
          Object.keys(errors).length > 0 ||
          values.password !== values.confirmPassword;

        return (
          <form onSubmit={handleSubmit}>
            <Input
              id="email"
              placeholder="laddy@app.com"
              label="Email"
              disabled={false}
              password={false}
              error={values.email !== initialValues.email && !!errors.email}
              success={values.email !== initialValues.email && !errors.email}
              onChange={handleChange}
              value={values.email}
            />
            <Input
              id="handle"
              placeholder="laddy"
              label="Handle"
              disabled={false}
              password={false}
              error={values.handle !== initialValues.handle && !!errors.handle}
              success={values.handle !== initialValues.handle && !errors.handle}
              onChange={handleChange}
              value={values.handle}
            />
            <Input
              id="password"
              placeholder="Shhh..."
              label="Password"
              disabled={false}
              password={true}
              error={
                values.password !== initialValues.password && !!errors.password
              }
              success={
                values.password !== initialValues.password && !errors.password
              }
              onChange={handleChange}
              value={values.password}
            />
            <Input
              id="confirmPassword"
              placeholder="Shhh..."
              label="Confirm Password"
              disabled={false}
              password={true}
              error={
                (values.confirmPassword !== initialValues.confirmPassword &&
                  !!errors.confirmPassword) ||
                (values.confirmPassword.length > 0 &&
                  values.password !== values.confirmPassword)
              }
              success={
                values.confirmPassword !== initialValues.confirmPassword &&
                !errors.confirmPassword &&
                values.password === values.confirmPassword
              }
              onChange={handleChange}
              value={values.confirmPassword}
            />
            <FormButton disabled={!hasChanged || hasErrors || isSubmitting}>
              Register
            </FormButton>
          </form>
        );
      }}
    </Formik>
  );
};

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
