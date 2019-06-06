import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./components/Homepage";

export default (
  <Router>
    <Route>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="*" render={() => <p>Not found</p>} />
      </Switch>
    </Route>
  </Router>
);
