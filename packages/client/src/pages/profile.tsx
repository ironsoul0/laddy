import React from "react";
import { useQuery } from "react-apollo";

import Centered from "../components/data/Centered";
import Heading from "../components/data/Heading";
import ProfileForm from "../components/forms/ProfileForm";
import Spinner from "../components/icons/Spinner";
import { GET_PROFILE } from "../graphql/GetProfile";

interface GetProfileData {
  profile: {
    email: string;
    handle: string;
  };
}

const Profile: React.FC = () => {
  const { data } = useQuery<GetProfileData>(GET_PROFILE);

  return (
    <Centered>
      {data ? (
        <>
          <Heading style={{ margin: 0 }}>Profile</Heading>
          <ProfileForm
            email={data.profile.email}
            handle={data.profile.handle}
          />
        </>
      ) : (
        <Spinner color="black" size={35} />
      )}
    </Centered>
  );
};

export default Profile;
