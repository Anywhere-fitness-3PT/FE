import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Login from "../images/Login background.png";
import { connect } from "react-redux";
import { loginFetch } from "../store/actions";
import { useHistory } from "react-router-dom";

const LoginForm = (props) => {
  const { push } = useHistory();
  const [credentials, setCredentials] = useState({
    email: "i<3Lambda",
    password: "L4mbda16!",
   
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  //console.log(props.success)
  const submit = (e) => {
    e.preventDefault();
    props.loginFetch(credentials);
    setCredentials({
      email: "i<3Lambda",
      password: "L4mbda16!",
    });
    push("/clients/:id/classes/:classId");
  };

  return (
    <div className="signUpContainer">
      <div className="signUpImage">
        <img src={Login} alt="Woman practicing yoga" className="w-100"></img>
      </div>
      <div className="signUpFormContainer">
        <div className="signUpForm">
          <h1 className="font-weight-bold mb-5">Sign In</h1>
          <Form onSubmit={submit}>
            <FormGroup>
              <Label htmlFor="username">Username/Email</Label>
              <Input
                id="email"
                type="text"
                name="email"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
                required
                minLength="8"
              />
            </FormGroup>
            
            <Button className="w-50">Confirm</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    success: state.login.success,
    isFetching: state.login.isFetching,
    error: state.login.error,
    token: state.login.token,
  };
};

export default connect(mapStateToProps, { loginFetch })(LoginForm);
