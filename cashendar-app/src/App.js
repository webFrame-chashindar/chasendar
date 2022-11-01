import React, {useContext} from "react";
import { Container } from "react-bootstrap";
import Layout from "./layouts/Layout";    
import Login from "./pages/Login/login";
import Calendar from "./pages/Calendar/calendar";
import Stats from "./pages/Stats/stats";
import DateSelected from "./pages/DateSelected/dateselected";
import CreateEventButton from "./pages/Create/createEventButton";
import EventModal from "./pages/Create/eventModal";

function App() {
    return (
        <>
            <Login />
            <Calendar />
            <Stats />
            <DateSelected />
            <CreateEventButton />
        </>
    );
}
export default App;
