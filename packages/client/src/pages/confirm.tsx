import React, { useEffect } from "react";
import { useMutation } from "react-apollo";
import { withRouter, RouteComponentProps, Redirect } from "react-router";
import { connect } from "react-redux";

import withNotification, {
  WithNotificationProps
} from "../components/hocs/withNotification";
import { CONFIRM_USER } from "../graphql/ConfirmUser";
import { login } from "../store/reducers/user/actions";

interface PropsFromDispatch {
  login: typeof login;
}

interface RouteParams {
  token: string;
}

type AllProps = PropsFromDispatch &
  WithNotificationProps &
  RouteComponentProps<RouteParams>;

const Confirm: React.FC<AllProps> = props => {
  const { token } = props.match.params;

  const [confirmUser, { loading }] = useMutation(CONFIRM_USER, {
    update(_, { data }) {
      props.showSuccess("Confirmed");
      localStorage.setItem("token", data.confirmUser);
      window.location.reload();
    },
    onError() {
      props.showError("Expired token");
    }
  });

  useEffect(() => {
    props.showLoading();
    confirmUser({
      variables: {
        token
      }
    });
  });

  return loading ? null : <Redirect to="/" />;
};

export default connect(null, { login })(withNotification(withRouter(Confirm)));
