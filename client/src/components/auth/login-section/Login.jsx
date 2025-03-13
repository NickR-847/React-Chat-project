import React, { useState } from "react";

import { API_LOGIN } from "../../../constants/endpoints";
import { Form, FormGroup, Input, Label } from "reactstrap";

const Login = (props) => {
  // TODO: Create state variables for email and password using the useState hook. The initial value for email should be a user that is already in your DB for testing purposes.  Same with the password.

  const [email, setEmail] = useState("nick@russotti.com");
  const [password, setPassword] = useState("1234");

  function handleSubmit(e) {
    e.preventDefault();
    // login();
  }

  async function login() {
    try {
      // Headers
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // Request Body
      let body = {
        email: email,
        password: password,
      };
       // Request Options
       let requestOption = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      };
       // Send Request
       let response = await fetch(API_LOGIN, requestOption);
       // Response Object
       let data = await response.json();
       // Update Token from the App.jsx file
       console.log(data);
       props.updateToken(data.sessionToken);
    } catch (error) {}
  }

  return (
    <>
      <div
        className="d-flex justify-content-center mt-5"
        style={{ height: "50vh" }}
      >
        <div
          className="secondary-background p-5 rounded"
          style={{ width: "450px", height: "370px" }}
        >
          <h2 className="text-center font-primary bold">LOGIN FORM</h2>
          {/* Form Goes Here */}
          <Form>
            {/* Form Group for Email */}
            <FormGroup>
              <Label for="email">Email</Label>
              {/* TODO add a value and assign it to email; onChange function to update the state */}
              <Input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                name="email"
                placeholder="Enter email"
                type="email"
              />
            </FormGroup>
            {/* Form Group End Email */}
            {/* ----------------------------- */}
            {/* Form Group for Password */}
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password"
                name="password"
                placeholder="Enter password"
                type="password"
              />
            </FormGroup>
            {/* Form Group End Password */}

            {/* Button Here */}
            

          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;

