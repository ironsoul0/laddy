import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

import Input from "../data/Input";
import FormButton from "../data/FormButton";
import withNotification, {
  WithNoficationProps
} from "../hocs/withNotification";

const REGISTER = gql`
  mutation Register($email: String!, $password: String!, $handle: String!) {
    register(email: $email, password: $password, handle: $handle)
  }
`;

const RegisterForm: React.FC<WithNoficationProps> = props => {
  const [registerMutation] = useMutation(REGISTER, {
    update(_, { data }) {
      const result = data.register;
      props.showSuccess(result);
    },
    onError(err) {
      props.showError(err.graphQLErrors[0].message);
    }
  });

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
      onSubmit={async values => {
        props.showLoading();
        await registerMutation({
          variables: {
            email: values.email,
            handle: values.handle,
            password: values.password
          }
        });
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
              label="Codeforces Handle"
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

export default withNotification(RegisterForm);
