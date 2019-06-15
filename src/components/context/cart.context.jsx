import React, { useReducer } from "react";

const initialState = {
  cartId: null
};

export const actions = {
  SET_CART_ID: cartId => ({
    type: "SET_CART_ID",
    payload: { cartId }
  })
};

const reducers = {
  SET_CART_ID: (state, { payload }) => ({ ...state, ...payload })
};

export function cartReducer(initialState, action = { type: "", payload: {} }) {
  if (reducers[action.type]) {
    return reducers[action.type](initialState, action);
  }

  return initialState;
}

export const CartContext = React.createContext({});

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
