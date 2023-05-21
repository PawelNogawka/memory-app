import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { register } from "../../actions/auth";
import { useTitle } from "../../hooks/useTitle";

import PhotoInput from "../../components/formElements/PhotoInput";
import Input from "../../components/formElements/Input";
import ErrorMessage from "../../components/formElements/ErrorMessage";
import Button from "../../components/formElements/Button";
import Wrapper from "../../components/uiElements/Wrapper";

import "./Register.scss";

const Register = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmedPassword: "",
    photo: "",
  });
  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmedPassword: null,
    photo: null,
  });

  const { error, isLoading } = useSelector((state) => state.auth);

  useTitle("register");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const newObj = { ...values, [e.target.name]: e.target.value };
    setValues(newObj);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setErrors({
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmedPassword: null,
      photo: null,
    });

    let shouldSubmit = true;

    if (!values.firstName.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: "First name is required.",
      }));

      shouldSubmit = false;
    }

    if (!values.lastName.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: "Last name is required.",
      }));
      shouldSubmit = false;
    }

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

    if (!values.password.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required.",
      }));
      shouldSubmit = false;
    }

    if (!values.confirmedPassword.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmedPassword: "Confirmed is required.",
      }));
      shouldSubmit = false;
    }

    if (!values.photo.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        photo: "Photo is required.",
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

    if (values.confirmedPassword !== values.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmedPassword: "Passwords doesen't match.",
      }));
      shouldSubmit = false;
    }

    if (shouldSubmit) {
      dispatch(register(values, navigate));
    }
  };

  return (
    <main className="register">
      <Wrapper>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleFormSubmit}
          className="register__form"
        >
          <h1 className="register__heading">Register</h1>
          <Input
            type="text"
            name="firstName"
            id="first-name"
            label="First name:"
            placeholder="Enter your first name..."
            ariaLabel="Enter your first name"
            onChange={handleInputChange}
            value={values.firstName}
          />
          {errors.firstName && <ErrorMessage error={errors.firstName} />}
          <Input
            type="text"
            name="lastName"
            id="last-name"
            label="Last name:"
            placeholder="Enter your last name..."
            ariaLabel="Enter your last name"
            onChange={handleInputChange}
            value={values.lastName}
          />
          {errors.lastName && <ErrorMessage error={errors.lastName} />}

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
          <Input
            type="password"
            name="confirmedPassword"
            id="confirm-password"
            label="Confirm password"
            placeholder="Confirm your password..."
            ariaLabel="Confirm your password"
            value={values.confirmedPassword}
            onChange={handleInputChange}
          />
          {errors.confirmedPassword && (
            <ErrorMessage error={errors.confirmedPassword} />
          )}
          <PhotoInput
            label="Add Thumbnail:"
            values={values}
            setValues={setValues}
            errors={errors}
            setErrors={setErrors}
          />
          {errors.photo && <ErrorMessage error={errors.photo} />}
          <div className="register__btns">
            <Button type="submit" disabled={isLoading} ariaLabel="Confirm form">
              {isLoading ? "Loading..." : "Register"}
            </Button>
            <Button to="/login" outline ariaLabel="Change to login">
              Already have an account? login
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

export default Register;
