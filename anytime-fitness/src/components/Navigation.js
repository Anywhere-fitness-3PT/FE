import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../store/actions";
import { useHistory } from "react-router-dom";

const Navigation = (props) => {
  const { push } = useHistory();
  const logout = () => {
    props.logoutUser();
    push("/");
  };

  return (
    <nav>
      <div className="navigation navSite">
        <div>
          <NavLink className="logoLink" to="/">
            <h1 id="logo">Anywhere Fitness</h1>
          </NavLink>
        </div>
        {!props.role ? (
          <div>
          <NavLink to="/">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </div>
        ) : (
          <div>
            <span>Greetings, {props.user.displayName}!</span>
            <br></br>
            <a onClick={logout}>Logout</a>
          </div>
        )}
      </div>

      {props.role === "instructor" ? (
        <div className="navLinksInstructor">
          <NavLink to="/Profile">Profile</NavLink>
          <NavLink to="/classes">Class List</NavLink>
          <NavLink to="/CreateClass">Create a class</NavLink>
        </div>
      ) : (
        <div className="navLinksUser">
          <NavLink to="/Profile">Profile</NavLink>
          <NavLink to="/classes">Class List</NavLink>
        </div>
      )}
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    role: state.login.role,
    user: state.login.user,
  };
};

export default connect(mapStateToProps, { logoutUser })(Navigation);
