import React, { useEffect } from "react";
import { useMutation } from "react-apollo";
import { withRouter, RouteComponentProps, Redirect } from "react-router";

import withNotification, {
  WithNotificationProps
} from "../components/hocs/withNotification";
import { CONFIRM_USER } from "../graphql/ConfirmUser";

interface RouteParams {
  token: string;
}

type AllProps = WithNotificationProps & RouteComponentProps<RouteParams>;

const Confirm: React.FC<AllProps> = props => {
  const { token } = props.match.params;

  const [confirmUser, { loading }] = useMutation(CONFIRM_USER, {
    update(_, { data }) {
      props.showSuccess("Confirmed");
      localStorage.setItem("token", data.confirmUser);
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

  return loading ? null : <Redirect to="/login" />;
};

export default withNotification(withRouter(Confirm));
