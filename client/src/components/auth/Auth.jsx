import React, { useState } from "react";

import Login from "./login/login";
import SignUp from "./signup/SignUp";


const Auth = (props) => {
    return (
        <>
           

           <Login updateToken={props.updateToken}/>
           <SignUp updateToken={props.updateToken}/>

          
        </>
    );
}

export default Auth;