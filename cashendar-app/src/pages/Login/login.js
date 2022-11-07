import "./login.css";
import React, { useState } from "react";
import LoginComponent from "./LoginComponent";
import Logout from "./Logout";

function Login(props) {
    if (!props.currentUser) {
        return <LoginComponent setUser={props.setUser} />;
    } else {
        return (
            <>
                <h3>{currentUser}</h3>
                <Logout setUser={props.setUser} />
            </>
        );
    }
}

export default Login;
