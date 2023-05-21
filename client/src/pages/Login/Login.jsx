import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../../actions/auth";
import {useTitle} from '../../hooks/useTitle'

import Input from "../../components/formElements/Input";
import Button from "../../components/formElements/Button";
import ErrorMessage from "../../components/formElements/ErrorMessage";
import Wrapper from "../../components/uiElements/Wrapper";

import "./Login.scss";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const { error, isLoading } = useSelector((state) => state.auth);

  useTitle('login')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const newObj = { ...values, [e.target.name]: e.target.value };
    setValues(newObj);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setErrors({
      email: null,
      password: null,
    });

    let shouldSubmit = true;
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!values.email.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required.",
      }));
      shouldSubmit = false;
    } else if (!emailRegex.test(values.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address.",
      }));
      shouldSubmit = false;
    }

    if (shouldSubmit) {
      dispatch(login(values, navigate));
    }

    if (!values.password.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required.",
      }));
      shouldSubmit = false;
    }

    if (values.password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters long.",
      }));
      shouldSubmit = false;
    }
  };

  return (
    <main className="login">
      <Wrapper>
        <form noValidate onSubmit={handleFormSubmit} className="login__form">
          <h1 className="login__heading">Login</h1>
          <Input
            type="email"
            name="email"
            id="email"
            label="Email"
            placeholder="Enter your email..."
            ariaLabel="Enter your email"
            onChange={handleInputChange}
            value={values.email}
          />
          {errors.email && <ErrorMessage error={errors.email} />}
          <Input
            type="password"
            name="password"
            id="password"
            label="Password"
            placeholder="Enter your password..."
            ariaLabel="Enter your password"
            value={values.password}
            onChange={handleInputChange}
          />
          {errors.password && <ErrorMessage error={errors.password} />}
          <div className="login__btns">
            <Button type="submit" disabled={isLoading} ariaLabel="Confirm form">
              {isLoading ? "Loading..." : "Login"}
            </Button>
            <Button to='/register' outline ariaLabel="Change to register">
              You don't have an account? register
            </Button>
          </div>
          {Object.values(errors).every((error) => error === null) && error && (
            <ErrorMessage error={error} />
          )}
        </form>
      </Wrapper>
    </main>
  );
};

export default Login;
