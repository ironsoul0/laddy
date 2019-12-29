import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo";
import { connect } from "react-redux";

import Input from "../data/Input";
import FormButton from "../data/FormButton";
import withNotification, {
  WithNoficationProps
} from "../hocs/withNotification";
import { login } from "../../store/reducers/user/actions";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
    }
  }
`;

interface PropsFromDispatch {
  login: typeof login;
}

type AllProps = WithNoficationProps & PropsFromDispatch;

const LoginForm: React.FC<AllProps> = props => {
  const [loginMutation] = useMutation(LOGIN, {
    update(_, { data }) {
      const { accessToken } = data.login;
      props.showSuccess();
      localStorage.setItem("token", accessToken);
      window.location.reload();
      // props.login(accessToken);
    },
    onError(err) {
      props.showError(err.graphQLErrors[0].message);
    }
  });

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
      onSubmit={async values => {
        props.showLoading();
        await loginMutation({
          variables: { email: values.email, password: values.password }
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

export default connect(null, { login })(withNotification(LoginForm));
