import { React, useContext, useState } from "react";
import { Container } from "react-bootstrap";
import Layout from "./layouts/Layout";
import LoginComponent from "./pages/Login/LoginComponent";
import Logout from "./pages/Login/Logout";
import Calendar from "./pages/Calendar/calendar";
import Stats from "./pages/Stats/stats";
import DateSelected from "./pages/DateSelected/dateselected";
import CreateEventButton from "./pages/Create/createEventButton";
import EventModal from "./pages/Create/eventModal";



function App() {
    const [currentUser, setUser] = useState();
    const [defaultBudget, setDefaultBudget] = useState(100000);
    const [remainBudget, setRemainBudget] = useState(defaultBudget);

    if (!currentUser) {
        return <LoginComponent setUser={setUser} />;
    } else {
        return (
            <>
                <h3>{currentUser}</h3>
                <Logout />
                <Calendar user={currentUser} defaultBudget = {defaultBudget} setDefaultBudget = {setDefaultBudget} remainBudget= {remainBudget} />
                <Stats />
                <CreateEventButton user={currentUser} defaultBudget = {defaultBudget} setDefaultBudget = {setDefaultBudget} remainBudget= {remainBudget} setRemainBudget = {setRemainBudget} />
            </>
        );
    }
}

export default App;
