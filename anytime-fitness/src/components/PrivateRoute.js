import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {

  const privCheck = localStorage.getItem("role");
  // console.log(privCheck);
  let val = false
  if (JSON.parse(privCheck) === 'instructor') {
    val = true;
  }
  // console.log(val)
  return (
    <Route
      {...rest}
      render={props => {
        if (val) {
          return <Component {...props} />; // component passed into props
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default PrivateRoute;