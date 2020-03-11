import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Counter from "../components/pages/counter/Counter";
import FirebaseTest from "../components/pages/firebaseTest/FirebaseTest";
import Landing from "../components/pages/landing/Landing";
interface Props {}

const Routes = (props: Props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/test" component={FirebaseTest} />
      </Switch>
    </Router>
  );
};

export default Routes;
