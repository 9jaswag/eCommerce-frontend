import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
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
import EditProfile from "./components/user/EditProfile";
import Search from "./components/product/Search";
import NotFound from "./components/shared/not_found/NotFound";

export default (
  <AuthProvider>
    <CartProvider>
      <Router>
        <Layout>
          <Route>
            <Switch>
              <Route exact path="/9jaswag" render={() => <Redirect to="/" />} />
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
              <AuthWrapper
                type="auth"
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <AuthWrapper exact path="/search" component={Search} />
              <AuthWrapper path="*" component={NotFound} />
            </Switch>
          </Route>
        </Layout>
      </Router>
    </CartProvider>
  </AuthProvider>
);
