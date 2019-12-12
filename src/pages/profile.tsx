import React from "react";

import Heading from "../components/data/Heading";
import Input from "../components/data/Input";
import styled from "../utils/styled";

const Profile: React.FC = () => {
  return (
    <Container>
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
      <Button>Update</Button>
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 20px 0;
`;

const Button = styled.button`
  color: ${props => props.theme.colors.black};
  font-size: 18px;
  border: none;
  background-color: ${props => props.theme.colors.yellow};
  width: 280px;
  border-radius: 10px;
  padding: 14px 0;
  margin-top: 30px;

  &:hover,
  &:focus,
  &:active {
    cursor: pointer;
    outline: none;
  }
`;
