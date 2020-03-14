import React from "react";
import { useFirestore, useFirebase } from "react-redux-firebase";
import { useToLandingIfNotAuthenticated } from "../../hooks/myCustomHooks";
import { useHistory } from "react-router-dom";
import Layout from "../../layout/Layout";

interface Props {}

const Feed = (props: Props) => {
  const firebase = useFirebase();
  const history = useHistory();
  //todo remove
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => history.push("/"));
  };
  useToLandingIfNotAuthenticated();
  return (
    <Layout>
      <div>
        <h3>Feed</h3>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </Layout>
  );
};

export default Feed;
