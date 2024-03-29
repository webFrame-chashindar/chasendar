import { React, useState, useRef } from "react";
import LoginComponent from "./pages/Login/LoginComponent";
import Calendar from "./pages/Calendar/calendar";
import "./app.css";
import Header from "./layouts/Header";

function App() {
    const myRef = useRef({});
    function doSomething() {
        myRef.current.functionWhichParentNeed();
    }

    const [currentUser, setUser] = useState(sessionStorage.getItem("user"));
    const [defaultBudget, setDefaultBudget] = useState();
    const [change, setChange] = useState();
    const [minus, setMinus] = useState();
    const [plus, setPlus] = useState();
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
                    plus={plus}
                    setPlus={setPlus}
                    minus={minus}
                    setMinus={setMinus}
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
                    plus={plus}
                    setPlus={setPlus}
                    minus={minus}
                    setMinus={setMinus}
                    ref={myRef}
                />
            </>
        );
    }
}

export default App;
