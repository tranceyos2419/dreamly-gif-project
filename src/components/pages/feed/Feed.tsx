import React from "react";
import { useFirestore, useFirebase } from "react-redux-firebase";
import { useToLandingIfNotAuthenticated } from "../../hooks/myCustomHooks";
import { useHistory } from "react-router-dom";

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
    <div>
      <h3>Feed</h3>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Feed;
