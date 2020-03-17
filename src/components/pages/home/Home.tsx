import React from "react";
import Layout from "../../layout/Layout";
import { useToLandingIfNotAuthenticated } from "../../hooks/myCustomHooks";
import UserList from "./userlist/UserList";
import SendGif from "./SendGif";
import styled, { css } from "styled-components";
import Posts from "./posts/Posts";

interface Props {}

const HomeWrapper = styled.div(
  () => css`
    display: flex;
    justify-content: space-around;
  `
);

const Home = (props: Props) => {
  useToLandingIfNotAuthenticated();
  return (
    <Layout>
      <h3>Home</h3>
      <HomeWrapper>
        <UserList />
        <Posts />
        <SendGif />
      </HomeWrapper>
    </Layout>
  );
};

export default Home;
