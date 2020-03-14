import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "../components/pages/landing/Landing";
import SignIn from "../components/pages/signin/SignIn";
import SignUp from "../components/pages/signup/SignUp";
import Home from "../components/pages/home/Home";
interface Props {}

const Routes = (props: Props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </Router>
  );
};

export default Routes;
