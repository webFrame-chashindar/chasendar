import React, { useState } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

import Logo from "./Logo";
import Logout from "../pages/Login/Logout";
import CreateEventButton from "../pages/Create/createEventButton";

const Header = ({user, defaultBudget,setDefaultBudget,remainBudget,setRemainBudget,buttonClick = f => f}) => {
    return (
        <div className="main_header">
            <Logo className="logo-main" />
            <CreateEventButton
                id="create-button"
                className="create-botton-container"
                user={user}
                defaultBudget={defaultBudget}
                setDefaultBudget={setDefaultBudget}
                remainBudget={remainBudget}
                setRemainBudget={setRemainBudget}
                //변경
                buttonClick={buttonClick}
            />
            <Logout />
        </div>
    );
};

export default Header;
