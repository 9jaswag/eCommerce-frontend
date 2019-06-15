import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./components/context/auth.context";
import { CartProvider } from "./components/context/cart.context";
import Home from "./components/home/Home";
import Product from "./components/product/Product";
import Layout from "./components/Layout";
import Cart from "./components/cart/Cart";
import AuthWrapper from "./components/shared/wrapper/AuthWrapper";

export default (
  <AuthProvider>
    <CartProvider>
      <Router>
        <Layout>
          <Route>
            <Switch>
              <AuthWrapper exact path="/" component={Home} />
              <AuthWrapper exact path="/products/:id" component={Product} />
              <AuthWrapper exact path="/cart" component={Cart} />
              <Route path="*" render={() => <p>Not found</p>} />
            </Switch>
          </Route>
        </Layout>
      </Router>
    </CartProvider>
  </AuthProvider>
);
