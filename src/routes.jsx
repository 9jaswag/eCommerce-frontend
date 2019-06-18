import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./components/context/auth.context";
import { CartProvider } from "./components/context/cart.context";
import Home from "./components/home/Home";
import Product from "./components/product/Product";
import Layout from "./components/Layout";
import Cart from "./components/cart/Cart";
import Checkout from "./components/cart/Checkout";
import AuthWrapper from "./components/shared/wrapper/AuthWrapper";
import Category from "./components/product/Category";
import Department from "./components/product/Department";
import Profile from "./components/user/Profile";

export default (
  <AuthProvider>
    <CartProvider>
      <Router>
        <Layout>
          <Route>
            <Switch>
              <AuthWrapper exact path="/" component={Home} />
              <AuthWrapper exact path="/products/:id" component={Product} />
              <AuthWrapper exact path="/category/:id" component={Category} />
              <AuthWrapper
                exact
                path="/department/:id"
                component={Department}
              />
              <AuthWrapper exact path="/cart" component={Cart} />
              <AuthWrapper
                type="auth"
                exact
                path="/checkout"
                component={Checkout}
              />
              <AuthWrapper
                type="auth"
                exact
                path="/profile"
                component={Profile}
              />
              <Route path="*" render={() => <p>Not found</p>} />
            </Switch>
          </Route>
        </Layout>
      </Router>
    </CartProvider>
  </AuthProvider>
);
