import "./login.css";
import React, { useState } from "react";
import LoginComponent from "./LoginComponent";
import Logout from "./Logout";

function Login() {
    const [currentUser, setUser] = useState();

    if (!currentUser) {
        return <LoginComponent setUser={setUser} />;
    } else {
        return (
            <>
                <h3>{currentUser}</h3>
                <Logout setUser={setUser} />
            </>
        );
    }
}

export default Login;
