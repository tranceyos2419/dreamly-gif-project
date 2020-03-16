import React from "react";
import Layout from "../../layout/Layout";
import { useToLandingIfNotAuthenticated } from "../../hooks/myCustomHooks";
import UserList from "./userlist/UserList";
import SendGif from "./SendGif";
import styled, { css } from "styled-components";

interface Props {}

const HomeWrapper = styled.div(
  () => css`
    display: flex;
    justify-content: space-between;
  `
);

const Home = (props: Props) => {
  useToLandingIfNotAuthenticated();
  return (
    <Layout>
      <h3>Home</h3>
      <HomeWrapper>
        <UserList />
        <SendGif />
      </HomeWrapper>
    </Layout>
  );
};

export default Home;
