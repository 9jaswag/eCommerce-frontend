import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./components/home/Home";
import Product from "./components/product/Product";
import Layout from "./components/Layout";

export default (
  <Router>
    <Layout>
      <Route>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/products/:id" exact component={Product} />
          <Route path="*" render={() => <p>Not found</p>} />
        </Switch>
      </Route>
    </Layout>
  </Router>
);
