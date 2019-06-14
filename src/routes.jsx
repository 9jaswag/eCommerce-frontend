import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./components/context/authContext";
import Home from "./components/home/Home";
import Product from "./components/product/Product";
import Layout from "./components/Layout";
import Cart from "./components/cart/Cart";
import AuthWrapper from "./components/shared/wrapper/AuthWrapper";

export default (
  <AuthProvider>
    <Router>
      <Layout>
        <Route>
          <Switch>
            <AuthWrapper exact path="/" component={Home} />
            <AuthWrapper exact path="/products/:id" component={Product} />
            <AuthWrapper type="auth" exact path="/cart" component={Cart} />
            <Route path="*" render={() => <p>Not found</p>} />
          </Switch>
        </Route>
      </Layout>
    </Router>
  </AuthProvider>
);
