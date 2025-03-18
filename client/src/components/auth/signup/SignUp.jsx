import React, { useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { API_SIGNUP } from "../../../constants/endpoints";
import RoomButton from "../../custom/RoomButton";

//sfc
const SignUp = (props) => {
  // Create state variables for first name, last name, email, and password using the useState hook.
  const [firstname, setFirstName] = useState("John");
  const [lastname, setLastName] = useState("Wick");
  const [email, setEmail] = useState("1jwick@puppyfinder.com");
  const [password, setPassword] = useState("focusCommitment1979");

  // function called handleSubmit that will console.log("Click Worked")
  function handleSubmit(e) {
    e.preventDefault();
    newUser()
  }
  async function newUser() {
    try {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      // Request Body
      //grabbbing from postman
      let body = {
        firstName: firstname,
        lastName: lastname,
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
      let response = await fetch(API_SIGNUP, requestOption);

      // Response Object
      let data = await response.json();

      // Update Token from the App.jsx file
      console.log(data);
    } catch (error) {}
  }

  return (
    <>
      <h1> Hello from SignUP </h1>
      <Form>
            {/* Form Group for First Name */}
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input
              value={firstname}
              onChange={(e)=>{
                setFirstName(e.target.value)
              }}
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter First Name"
              />
            </FormGroup>
            {/* Form Group End First Name */}

            {/* Form Group for Last Name */}
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input
              value={lastname}
              onChange={(e)=>{
                setLastName(e.target.value)
              }}
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter Last Name"
              />
            </FormGroup>
            {/* Form Group End Last Name */}

            {/* Form Group for Email */}
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
               value={email}
               onChange={(e) => {
                 setEmail(e.target.value);
               }}
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
              />
            </FormGroup>
            {/* Form Group End Email */}
            {/* Form Group for Password */}
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
               value={password}
               onChange={(e)=>{
                 setPassword(e.target.value)
               }}
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
              />
            </FormGroup>
            {/* Form Group End Password */}
            {/* Form Group End Password */}
            <RoomButton onClick={handleSubmit}>SIGN UP</RoomButton>
        </Form>
    </>
  );
};

export default SignUp;
