import React from "react";
import Layout from "../../layout/Layout";
import { useToLandingIfNotAuthenticated } from "../../hooks/myCustomHooks";

interface Props {}

//todo change the name of useToFeed
const Home = (props: Props) => {
  useToLandingIfNotAuthenticated();
  return (
    <Layout>
      <h3>Home</h3>
    </Layout>
  );
};

export default Home;
