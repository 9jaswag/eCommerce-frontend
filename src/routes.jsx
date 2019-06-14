import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./components/context/authContext";
import Homepage from "./components/home/Home";
import Product from "./components/product/Product";
import Layout from "./components/Layout";
import Cart from "./components/cart/Cart";

export default (
  <AuthProvider>
    <Router>
      <Layout>
        <Route>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/products/:id" exact component={Product} />
            <Route path="/cart" exact component={Cart} />
            <Route path="*" render={() => <p>Not found</p>} />
          </Switch>
        </Route>
      </Layout>
    </Router>
  </AuthProvider>
);
