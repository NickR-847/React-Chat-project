import React, { useState } from "react";
import Login from "./login-section/Login";
import Signup from "./signup-section/SignUp";

const Auth = (props) => {
    return (
        <>
           <h1> Hello from Auth </h1>
           <Login updateToken={props.updateToken}/>
           <Signup />
        </>
    );
}

export default Auth;