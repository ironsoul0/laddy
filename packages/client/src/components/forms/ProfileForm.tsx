import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/react-hooks";

import FormButton from "../data/FormButton";
import Input from "../data/Input";
import withNotification, {
  WithNotificationProps
} from "../hocs/withNotification";
import { UPDATE_PROFILE } from "../../graphql/UpdateProfile";
import { GET_PROFILE } from "../../graphql/GetProfile";
import { GetProfileData } from "../../pages/profile";

interface ProfileFormProps {
  email: string;
  handle: string;
}

const ProfileForm: React.FC<WithNotificationProps &
  ProfileFormProps> = props => {
  const [updateMutation] = useMutation(UPDATE_PROFILE, {
    onError(err) {
      props.showError(err.graphQLErrors && err.graphQLErrors[0].message);
    }
  });

  const formikInitialValues = {
    email: props.email,
    handle: props.handle,
    currentPassword: "",
    password: "",
    confirmPassword: ""
  };

  return (
    <Formik
      initialValues={formikInitialValues}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
        handle: Yup.string().required(),
        currentPassword: Yup.string()
          .min(3)
          .required(),
        password: Yup.string().min(3),
        confirmPassword: Yup.string().min(3)
      })}
      onSubmit={async (values, { resetForm }) => {
        props.showLoading();
        await updateMutation({
          variables: {
            handle: values.handle,
            password: values.currentPassword,
            newPassword: values.confirmPassword
          },
          update(cache, { data }) {
            const result = data.updateProfile;
            props.showSuccess(result);
            resetForm({
              values: { ...formikInitialValues, handle: values.handle }
            });
            const cachedData: GetProfileData | null = cache.readQuery({
              query: GET_PROFILE
            });
            if (cachedData) {
              const profileInfo = cachedData.profile;
              cache.writeQuery({
                query: GET_PROFILE,
                data: { profile: { ...profileInfo, handle: values.handle } }
              });
            }
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
              label="Email"
              disabled={true}
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
              label="New Password"
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
              label="Confirm New Password"
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
            <Input
              attention
              id="currentPassword"
              label="Current Password"
              disabled={false}
              password={true}
              error={
                values.currentPassword !== initialValues.currentPassword &&
                !!errors.currentPassword
              }
              success={
                values.currentPassword !== initialValues.currentPassword &&
                !errors.currentPassword
              }
              onChange={handleChange}
              value={values.currentPassword}
            />
            <FormButton disabled={!hasChanged || hasErrors || isSubmitting}>
              Update
            </FormButton>
          </form>
        );
      }}
    </Formik>
  );
};

export default withNotification(ProfileForm);
