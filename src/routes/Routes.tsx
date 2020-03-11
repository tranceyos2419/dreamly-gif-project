import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "../components/pages/landing/Landing";
import SignIn from "../components/pages/signin/SignIn";
import SignUp from "../components/pages/signup/SignUp";
interface Props {}

const Routes = (props: Props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
      </Switch>
    </Router>
  );
};

export default Routes;
