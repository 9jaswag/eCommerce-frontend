import React, { useReducer } from "react";

export const initialState = {
  user: null,
  accessToken: window.localStorage.getItem("accessToken"),
  isAuthenticated: false
};

export const actions = {
  SET_USER: user => ({
    type: "SET_USER",
    payload: { user }
  }),
  SET_TOKEN: accessToken => ({
    type: "SET_TOKEN",
    payload: { accessToken }
  }),
  SET_AUTHENTICATION: isAuthenticated => ({
    type: "SET_AUTHENTICATION",
    payload: { isAuthenticated }
  })
};

const reducers = {
  SET_USER: (state, { payload }) => ({ ...state, ...payload }),
  SET_TOKEN: (state, { payload }) => ({ ...state, ...payload }),
  SET_AUTHENTICATION: (state, { payload }) => ({ ...state, ...payload })
};

export function authReducer(initialState, action = { type: "", payload: {} }) {
  if (reducers[action.type]) {
    return reducers[action.type](initialState, action);
  }
  return initialState;
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export const AuthContext = React.createContext({});
