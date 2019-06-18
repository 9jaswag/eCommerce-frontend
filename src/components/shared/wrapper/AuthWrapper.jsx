import React, { useContext, useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { getUser } from "../../../action/auth.action";
import { actions, AuthContext } from "../../context/auth.context";

export default function AuthWrapper({
  component: Component,
  type = "general",
  ...rest
}) {
  const [isLoading, setIsLoading] = useState(true);
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (state.accessToken && !state.user) {
      const fetchUser = async () => {
        try {
          const response = await getUser();
          dispatch(actions.SET_USER(response));
          dispatch(actions.SET_AUTHENTICATION(true));
          setIsLoading(false);
        } catch (error) {
          dispatch(actions.SET_USER({}));
          dispatch(actions.SET_AUTHENTICATION(false));
          setIsLoading(false);
        }
      };
      fetchUser();
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [state.accessToken, state.user, dispatch]);

  const renderComponent = props => {
    if (type === "general") {
      return <Component {...props} />;
    }

    if (type === "guest" && state.isAuthenticated) {
      return <Redirect to="/" />;
    }

    if (type === "guest" && !state.isAuthenticated) {
      return <Component {...props} />;
    }

    if (!state.isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return <Component {...props} />;
    }
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Route {...rest} render={props => <>{renderComponent(props)}</>} />
      )}
    </>
  );
}
