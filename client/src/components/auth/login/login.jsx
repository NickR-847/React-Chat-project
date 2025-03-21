import React, { useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { API_LOGIN } from "../../../constants/endpoints";
import RoomButton from "../../custom/RoomButton";

const Login = (props) => {
  //state variables for email and password using the useState hook.
  //usf shortcut
  //email & password from postman to test

  const [email, setEmail] = useState("1jwick@puppyfinder.com");
  const [password, setPassword] = useState("focusCommitment1979");

  function handleSubmit(e) {
    e.preventDefault();
    login();
  }

  async function login() {
    try {
      // Headers
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      // Request Body
      //grabbbing from postman
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
      props.updateToken(data.token);
  } catch (error) {
    console.error("Login error:", error);
  }
}
  return (
    <>
      <h2 className="text-center font-primary bold">LOGIN FORM</h2>
      {/* form */}
      <Form onSubmit={handleSubmit}>
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
        {/* Form Group for Email */}

        {/* Form Group End Email */}
        {/* ----------------------------- */}
        {/* Form Group for Password */}
        <FormGroup>
          <Label for="Password">Password</Label>
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
        <RoomButton onClick={handleSubmit}>Login</RoomButton>
      </Form>
    </>
  );
};

export default Login;
