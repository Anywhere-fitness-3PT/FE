import React, { useState } from "react";
import * as yup from "yup";
import axios from "axios";

//Schema

const formSchema = yup.object().shape({
  name: yup.string().required("Name must be at least 2 characters").min(2),
  email: yup.string(),
});

export default function SignUpForm() {
  //managing state for form inputs

  const [formState, setFormState] = useState({
    name: "",
    email: "",
  });

  //error state

  const [errorState, setErrorState] = useState({
    name: "",
    email: "",
  });

  const validate = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrorState({
          ...errorState,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        console.log(err.errors);
        setErrorState({
          ...errorState,
          [e.target.name]: err.errors[0],
        });
      });
  };

  //onChange function

  const inputChange = (e) => {
    e.persist();

    validate(e);

    let value = e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };

  //onSubmit function

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted!");
    axios
      .post("https://reqres.in/api/users", formState)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <h3>Register your account, here:</h3>

        {/* FORM BEGINS HERE  */}

        <form onSubmit={formSubmit} id="form" data-cy="form">
          <label htmlFor="name">
            Name:
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formState.name}
              onChange={inputChange}
            />
          </label>

          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formState.email}
              onChange={inputChange}
            />
          </label>

          {/* SETTING ERROR MESSAGE FOR VALUE NOT PASSING VALIDATION */}

          {errorState.name.length > 0 ? (
            <p className="error">{errorState.name}</p>
          ) : null}

          <button type="submit" className="submit-button">
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
