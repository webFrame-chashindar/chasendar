import { React, useContext, useState, useRef } from "react";
import LoginComponent from "./pages/Login/LoginComponent";
import Calendar from "./pages/Calendar/calendar";
import "./app.css";
import Header from "./layouts/Header";

function App() {
    const myRef = useRef({});
    function doSomething() {
        myRef.current.functionWhichParentNeed();
    }
    const [currentUser, setUser] = useState();
    const [defaultBudget, setDefaultBudget] = useState();
    const [change, setChange] = useState();
    const [buttonClick, setButtonClick] = useState(false);
    //
    if (buttonClick === true) {
        doSomething();
        setButtonClick(false);
    }
    //
    if (!currentUser) {
        return <LoginComponent setUser={setUser} />;
    } else {
        return (
            <>
                <Header
                    user={currentUser}
                    defaultBudget={defaultBudget}
                    setDefaultBudget={setDefaultBudget}
                    change={change}
                    setChange={setChange}
                    //변경
                    buttonClick={(check) => setButtonClick(check)}
                />
                <hr />
                <Calendar
                    user={currentUser}
                    defaultBudget={defaultBudget}
                    setDefaultBudget={setDefaultBudget}
                    change={change}
                    setChange={setChange}
                    ref={myRef}
                    buttonClick={buttonClick}
                    setButtonClick={setButtonClick}
                />
            </>
        );
    }
}

export default App;
/*
<MainHeader
                    id="create-button"
                    className="create-botton-container"
                    user={currentUser}
                    defaultBudget={defaultBudget}
                    setDefaultBudget={setDefaultBudget}
                    remainBudget={remainBudget}
                    setRemainBudget={setRemainBudget}
                    //변경
                    buttonClick={(check) => setButtonClick(check)}
                />
                */
