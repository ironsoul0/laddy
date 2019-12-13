import React from "react";

import Centered from "../components/data/Centered";
import FormButton from "../components/data/FormButton";
import Heading from "../components/data/Heading";
import Input from "../components/data/Input";

const Profile: React.FC = () => {
  return (
    <Centered>
      <Heading style={{ margin: 0 }}>Profile</Heading>
      <Input
        value="timka2609@gmail.com"
        label="Email"
        disabled={true}
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
        label="New Password"
        disabled={false}
        password={true}
      />
      <Input
        value="kekocity"
        label="Current Password"
        disabled={false}
        password={true}
      />
      <FormButton>Update</FormButton>
    </Centered>
  );
};

export default Profile;
