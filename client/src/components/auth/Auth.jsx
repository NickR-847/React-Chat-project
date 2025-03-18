import React, { useState } from "react";
import Login from "./login/login";
import SignUp from "./signup/SignUp";

const Auth = (props) => {
    return (
        <>
           <h1> Hello from Auth </h1>
           <Login />
           <SignUp/>

           
        </>
    );
}

export default Auth;