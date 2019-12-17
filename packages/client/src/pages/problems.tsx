import React, { useState } from "react";
import { connect } from "react-redux";

import styled from "../utils/styled";
import HeaderCard from "../components/data/HeaderCard";
import Problem from "../components/data/Problem";
import Heading from "../components/data/Heading";
import FloatingButton from "../components/data/FloatingButton";
import {
  showNotification,
  hideNotification
} from "../store/reducers/notifications/actions";
import { NotificationsActionTypes } from "../store/reducers/notifications/types";

interface ProblemsProps {
  range: string;
}

interface PropsFromDispatch {
  showNotification: typeof showNotification;
  hideNotification: typeof hideNotification;
}

type AllProps = ProblemsProps & PropsFromDispatch;

const Problems: React.FC<AllProps> = props => {
  const [isJoined, setJoined] = useState(false);

  const handleClick = () => {
    props.showNotification(NotificationsActionTypes.LOADING_NOTIFICATION);
    setTimeout(() => {
      props.showNotification(
        NotificationsActionTypes.SUCCESS_NOTIFICATION,
        "Joined!"
      );
      setJoined(true);
    }, 2000);
    setTimeout(() => {
      props.hideNotification();
    }, 4000);
  };

  return (
    <>
      <Heading>Problems</Heading>
      <RatingRange>{props.range}</RatingRange>
      <HeaderCard content={["Problem", "Difficulty level"]} />
      <Problem
        name="Kekocity"
        difficulty={3}
        solved={true}
        link="https://codeforces.com/contest/1255/problem/E1"
      />
      <Problem
        name="Krauch's Adventure"
        difficulty={4}
        solved={false}
        link="https://codeforces.com/contest/1255/problem/E1"
      />
      <Problem
        name="Kekocity"
        difficulty={3}
        solved={true}
        link="https://codeforces.com/contest/1255/problem/E1"
      />
      <Problem
        name="Krauch's Adventure"
        difficulty={4}
        solved={false}
        link="https://codeforces.com/contest/1255/problem/E1"
      />
      <Problem
        name="Kekocity"
        difficulty={3}
        solved={true}
        link="https://codeforces.com/contest/1255/problem/E1"
      />
      <Problem
        name="Krauch's Adventure"
        difficulty={4}
        solved={false}
        link="https://codeforces.com/contest/1255/problem/E1"
      />
      <Problem
        name="Kekocity"
        difficulty={3}
        solved={true}
        link="https://codeforces.com/contest/1255/problem/E1"
      />
      <Problem
        name="Krauch's Adventure"
        difficulty={4}
        solved={false}
        link="https://codeforces.com/contest/1255/problem/E1"
      />
      <Problem
        name="Kekocity"
        difficulty={3}
        solved={true}
        link="https://codeforces.com/contest/1255/problem/E1"
      />
      <Problem
        name="Krauch's Adventure"
        difficulty={4}
        solved={false}
        link="https://codeforces.com/contest/1255/problem/E1"
      />
      <Problem
        name="Kekocity"
        difficulty={3}
        solved={true}
        link="https://codeforces.com/contest/1255/problem/E1"
      />
      <Problem
        name="Krauch's Adventure"
        difficulty={4}
        solved={false}
        link="https://codeforces.com/contest/1255/problem/E1"
      />
      <Problem
        name="Kekocity"
        difficulty={3}
        solved={true}
        link="https://codeforces.com/contest/1255/problem/E1"
      />
      <Problem
        name="Krauch's Adventure"
        difficulty={4}
        solved={false}
        link="https://codeforces.com/contest/1255/problem/E1"
      />
      <Problem
        name="Kekocity"
        difficulty={3}
        solved={true}
        link="https://codeforces.com/contest/1255/problem/E1"
      />
      <FloatingButton joined={isJoined} onClick={handleClick} />
    </>
  );
};

const mapDispatchToProps = {
  showNotification,
  hideNotification
};

export default connect(null, mapDispatchToProps)(Problems);

const RatingRange = styled.p`
  font-size: 17px;
  color: ${props => props.theme.colors.black};
  margin-top: 10px;
  margin-bottom: 30px;
`;
