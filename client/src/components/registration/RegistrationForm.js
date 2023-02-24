import React, { useState } from "react";
import FormError from "../layout/FormError";
import config from "../../config";

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState({});

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateInput = (payload) => {
    setErrors({});
    const { email, username, password, passwordConfirmation } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (username.trim() == "") {
      newErrors = {
        ...newErrors,
        username: "is required"
      }
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        };
      }
    }

    setErrors(newErrors);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    validateInput(userPayload);
    try {
      if (Object.keys(errors).length === 0) {
        const response = await fetch("/api/v1/users", {
          method: "post",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
        const userData = await response.json();
        setShouldRedirect(true);
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <div className="sub-page-container">
      <div className="authentication--container">
        <h1>Register</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label className="authentication--line">
              <input 
                type="text" 
                name="email" 
                value={userPayload.email} 
                onChange={onInputChange} 
                className="authentication--input authentication--input-top"
              />
              <span className="authentication--label">Email</span>
            </label>
            <FormError error={errors.email} />
          </div>
          <div>
            <label className="authentication--line">
              <input 
                type="text" 
                name="username" 
                value={userPayload.username} 
                onChange={onInputChange} 
                className="authentication--input"
              />
              <span className="authentication--label">Username</span>
            </label>
            <FormError error={errors.username} />
          </div>
          <div>
            <label className="authentication--line">
              <input
                type="password"
                name="password"
                value={userPayload.password}
                onChange={onInputChange}
                className="authentication--input"
              />
              <span className="authentication--label">Password</span>
            </label>
            <FormError error={errors.password} />
          </div>
          <div>
            <label className="authentication--line">
              <input
                type="password"
                name="passwordConfirmation"
                value={userPayload.passwordConfirmation}
                onChange={onInputChange}
                className="authentication--input authentication--input-bottom"
              />
              <span className="authentication--label">Confirm Password</span>
            </label>
            <FormError error={errors.passwordConfirmation} />
          </div>
          <div>
            <input type="submit" className="button authentication--button" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
