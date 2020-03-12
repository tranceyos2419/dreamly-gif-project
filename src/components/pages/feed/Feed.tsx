import React from "react";
import { useFirestore, useFirebase } from "react-redux-firebase";
import { useToLandingIfNotAuthenticated } from "../../hooks/myCustomHooks";

interface Props {}

const Feed = (props: Props) => {
  const firebase = useFirebase();
  //todo remove
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => alert("you are signed out"));
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
