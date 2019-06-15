import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { actions, AuthContext } from "../../context/auth.context";

export default function({ name }) {
  const { dispatch } = useContext(AuthContext);

  const logOut = () => {
    dispatch(actions.SET_USER({}));
    dispatch(actions.SET_AUTHENTICATION(false));
    dispatch(actions.SET_TOKEN(""));
    window.localStorage.removeItem("accessToken");
  };

  return (
    <>
      <div className="navbar-item has-dropdown is-hoverable">
        <Link to="/" className="navbar-link">
          Hi &nbsp;<span className="has-text-weight-semibold">{name}</span>
        </Link>
        <div className="navbar-dropdown">
          <Link to="/cart" className="navbar-item">
            My Bag
          </Link>
          <Link to="/profile" className="navbar-item">
            Profile
          </Link>
          <hr className="navbar-divider" />
          <Link to="#" className="navbar-item" onClick={logOut}>
            Logout
          </Link>
        </div>
      </div>
    </>
  );
}
