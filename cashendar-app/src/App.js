import { React, useContext, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import Layout from "./layouts/Layout";
import LoginComponent from "./pages/Login/LoginComponent";
import Logout from "./pages/Login/Logout";
import Calendar from "./pages/Calendar/calendar";
import Logo from "./layouts/Logo";
import CreateEventButton from "./pages/Create/createEventButton";
import "./app.css";
import Header from "./layouts/Header";

function App() {
    const myRef = useRef({});
    function doSomething(){
        myRef.current.functionWhichParentNeed();
    }
    const [currentUser, setUser] = useState();
    const [defaultBudget, setDefaultBudget] = useState(100000);
    const [remainBudget, setRemainBudget] = useState(defaultBudget);
    const [buttonClick, setButtonClick] = useState(false);
     //
     if(buttonClick === true){
        doSomething();
        setButtonClick(false);
    }
    //
    if (!currentUser) {
        return <LoginComponent setUser={setUser} />;
    } else {
        return (
            <>
                <div className="main_header">
                    <Logo className="logo-main" />
                    <Logout id="logout" />
                </div>
                  <CreateEventButton
                    className="create-botton-container"
                    user={currentUser}
                    defaultBudget={defaultBudget}
                    setDefaultBudget={setDefaultBudget}
                    remainBudget={remainBudget}
                    setRemainBudget={setRemainBudget}
                    //변경
                    buttonClick={(check) => setButtonClick(check)}
                />
                <hr />
                <Calendar
                    user={currentUser}
                    defaultBudget={defaultBudget}
                    setDefaultBudget={setDefaultBudget}
                    remainBudget={remainBudget}
                    setRemainBudget={setRemainBudget}
                    ref={myRef}
                />
            </>
        );
    }
}

export default App;
