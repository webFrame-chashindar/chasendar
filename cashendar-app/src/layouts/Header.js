import React, { useState } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

import Logo from "./Logo";
import Logout from "../pages/Login/Logout";
import CreateEventButton from "../pages/Create/createEventButton";

const Header = (props) => {
    return (
        <div className="main_header">
            <Logo className="logo-main" />
            <CreateEventButton
                id="create-button"
                className="create-botton-container"
                user={props.currentUser}
                defaultBudget={props.defaultBudget}
                setDefaultBudget={props.setDefaultBudget}
                remainBudget={props.remainBudget}
                setRemainBudget={props.setRemainBudget}
                //변경
                buttonClick={props.buttonClick}
            />
            <Logout />
        </div>
    );
};

export default Header;
