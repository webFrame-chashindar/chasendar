import React, { useState } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import SignInModal from "./SignInModal";
import EventModal from "./eventModal";

import "./create.css";

export default function CreateEventButton({
    user,
    defaultBudget,
    setDefaultBudget,
    change,
    setChange,
    plus,
    setPlus,
    minus,
    setMinus,
    buttonClick = (f) => f,
}) {
    const [showEventModal, setShowEventModal] = useState(false);
    const [showSignInModalOn, setShowSignInModalOn] = useState(false);

    const handleShowEventModal = () => {
        setShowEventModal(false);
    };

    const handleShowSignInModal = () => {
        setShowSignInModalOn(false);
    };

    return (
        <>
            <Navbar
                bg="light"
                expand="lg"
                className="create-button"
                id="createButtons"
            >
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link>
                                <Button
                                    variant="primary"
                                    onClick={() => setShowSignInModalOn(true)}
                                >
                                    수입/지출
                                </Button>
                            </Nav.Link>
                            <Nav.Link>
                                <Button
                                    variant="secondary"
                                    onClick={() => setShowEventModal(true)}
                                >
                                    일정 등록
                                </Button>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {showEventModal && (
                <EventModal
                    user={user}
                    handleShow={handleShowEventModal}
                    show={showEventModal}
                    onHide={() => setShowEventModal(false)}
                    // 변경
                    buttonClick={buttonClick}
                />
            )}

            {showSignInModalOn && (
                <SignInModal
                    user={user}
                    defaultBudget={defaultBudget}
                    setDefaultBudget={setDefaultBudget}
                    change={change}
                    setChange={setChange}
                    plus={plus}
                    setPlus={setPlus}
                    minus={minus}
                    setMinus={setMinus}
                    handleShow={handleShowSignInModal}
                    show={showSignInModalOn}
                    onHide={() => setShowSignInModalOn(false)}
                    // 변경
                    buttonClick={buttonClick}
                />
            )}
        </>
    );
}
