import React from "react";
import { useToFeedIfAuthenticated } from "../../hooks/myCustomHooks";

interface Props {}

const SignIn = (props: Props) => {
  useToFeedIfAuthenticated();
  return (
    <div>
      <h3>Sign In</h3>
    </div>
  );
};

export default SignIn;
