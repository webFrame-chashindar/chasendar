import React, { useState } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

import Logo from "./Layout";
import Logout from "../pages/Login/Logout";
import CreateEventButton from "../pages/Create/createEventButton";

const Header = (props) => {
    return (
        <div className="main_header">
            <Logo className="logo-main" />
            <CreateEventButton
                className="create-botton-container"
                user={props.user}
                defaultBudget={props.defaultBudget}
                setDefaultBudget={props.setDefaultBudget}
                remainBudget={props.remainBudget}
                setRemainBudget={props.setRemainBudget}
                //변경
                buttonClick={(f) => f}
            />
            <Logout id="logout" />
            <hr />
        </div>
    );
};

export default Header;
