import React from "react";
import Layout from "../../layout/Layout";
import { useToLandingIfNotAuthenticated } from "../../hooks/myCustomHooks";
import UserList from "./UserList";
import SendGif from "./SendGif";
import styled, { css } from "styled-components";
import Posts from "./posts/Posts";
import PostBar from "./PostBar";

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
      <PostBar />
      <HomeWrapper>
        <UserList />
        <Posts />
        <SendGif />
      </HomeWrapper>
    </Layout>
  );
};

export default Home;
