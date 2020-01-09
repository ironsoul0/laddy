import React from "react";

import styled from "../utils/styled";
import Logo from "../components/icons/Logo";
import mixins from "../styles/mixins";
import screenshot from "../assets/screenshot.png";

const Landing = () => {
  return (
    <Container>
      <Header>
        <HeaderBody>
          <Item>
            <LogoIcon />
            <Heading>Laddy</Heading>
          </Item>
          <Item>
            <GithubLink
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/ironsoul0/laddy"
            >
              GitHub
            </GithubLink>
            <Button href="/login">Sign Up</Button>
          </Item>
        </HeaderBody>
      </Header>
      <Body>
        <BodyHeading>Practice Ladders for Programmers</BodyHeading>
        <BodyDescription>
          Laddy is a free and open-source web app allowing to solve problems
          selected for your Codeforces rating.
        </BodyDescription>
        <Item style={{ justifyContent: "center", marginTop: "30px" }}>
          <BigButton href="/login">Sign Up</BigButton>
          <SourceButton
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/ironsoul0/laddy"
          >
            View Source
          </SourceButton>
        </Item>
        <Screenshot src={screenshot} />
      </Body>
    </Container>
  );
};

export default Landing;

const Container = styled.div``;

const Header = styled.header`
  background-color: ${props => props.theme.colors.white};
  border-bottom: 1px solid #e5e5e5;
`;

const HeaderBody = styled.div`
  padding: 11px 25px;
  max-width: ${props => props.theme.breakpoints.lg};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoIcon = styled(Logo)`
  width: 33px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 23px;
  padding-left: 15px;
`;

const Button = styled.a`
  border: 1px solid black;
  font-size: 18px;
  background: #5183f5;
  color: white;
  border: none;
  padding: 10px 20px;
  background: ${props => props.theme.colors.yellow};
  ${mixins.dropDecoration};

  &:hover {
    opacity: 0.9;
  }
`;

const GithubLink = styled.a`
  color: ${props => props.theme.colors.yellow};
  font-size: 18px;
  ${mixins.dropDecoration};
  margin-right: 25px;

  &:hover {
    opacity: 0.9;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`;

const Body = styled.main`
  padding-top: 35px;
  text-align: center;
  padding-left: 25px;
  padding-right: 25px;
`;

const BodyHeading = styled.h1`
  font-size: 40px;

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 34px;
  }
`;

const BodyDescription = styled.p`
  font-size: 20px;
  color: #888;
  max-width: 600px;
  margin: 0 auto;
  line-height: 30px;

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 19px;
    line-height: 26px;
  }
`;

const BigButton = styled(Button)`
  font-size: 20px;
  padding: 15px 25px;

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 18px;
    padding: 13px 20px;
  }
`;

const SourceButton = styled(BigButton)`
  margin-left: 15px;
  background-color: #d1d1d1;
  color: #666;
  font-size: 20px;
`;

const Screenshot = styled.img`
  max-width: 1200px;
  margin-top: 40px;
  width: 100%;
`;
