import React from "react";

import Centered from "../components/data/Centered";
import Heading from "../components/data/Heading";
import ProfileForm from "../components/forms/ProfileForm";

const Profile: React.FC = () => {
  return (
    <Centered>
      <Heading style={{ margin: 0 }}>Profile</Heading>
      <ProfileForm />
    </Centered>
  );
};

export default Profile;
