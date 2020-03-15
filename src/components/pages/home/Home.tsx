import React from "react";
import Layout from "../../layout/Layout";
import { useToLandingIfNotAuthenticated } from "../../hooks/myCustomHooks";
import UserList from "./userlist/UserList";
import SendGif from "./SendGif";

interface Props {}

const Home = (props: Props) => {
  useToLandingIfNotAuthenticated();
  return (
    <Layout>
      <h3>Home</h3>
      {/* <UserList /> */}
      <SendGif />
    </Layout>
  );
};

export default Home;
