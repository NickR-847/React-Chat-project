import { API_SIGNUP } from "../../../constants/endpoints";
import { useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";

const Signup = (props) => {
  // TODO: Create state variables for first name, last name, email, and password using the useState hook. The initial value for first name should be "John", the initial value for last name should be "Doe", the initial value for email should be "

  const [email, setEmail] = useState("nick@russotti.com");
  const [password, setPassword] = useState("1234");
  const [firstName, setFirstName] = useState("Nicholas");
  const [lastName, setLastName] = useState("Russotti");

  // TODO: Create a function called handleSubmit that will console.log("Click Worked")
  function handleSubmit(e) {
    e.preventDefault();
    signUp();
  }
  async function signUp() {
    try {
      // Headers
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // Request Body
      let body = {
        firstName: firstName,
        lastName: lastName,
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
    } catch (error) {
      console.log(error);
    }
  }
    return (
    <>
      <div
        className="d-flex justify-content-center mt-5"
        style={{ height: "50vh" }}
      >
        <div
          className="secondary-background p-5 rounded"
          style={{ width: "450px", height: "530px" }}
        >
          <h2 className="text-center font-primary bold">SIGN UP FORM</h2>
          {/* Form Goes Here */}
          <Form>
            {/* Form Group for First Name */}
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
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

export default Signup;
