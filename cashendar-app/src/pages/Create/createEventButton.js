import React, { useState } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import SignInModal from "./SignInModal";
import EventModal from "./eventModal";
import { db } from "../../fbase/fbase";
import { setDoc, doc } from "firebase/firestore";

import "./create.css";

export default function CreateEventButton({
    user,
    defaultBudget,
    setDefaultBudget,
    remainBudget,
    setRemainBudget,
    buttonClick = f => f
}) {
    const [showEventModal, setShowEventModal] = useState(false);
    const [showSignInModalOn, setShowSignInModalOn] = useState(false);

    const handleShowEventModal = () => {
        setShowEventModal(false);
    };

    const handleShowSignInModal = () => {
        setShowSignInModalOn(false);
    };

    //사용자 예산 저장 -> 미완성
    // const saveUserInfo = async () => {
    //     console.log(`save userInfo : ${user}`)
    //     await setDoc(doc(db, "userInfo", {user}), {
    //        user : {user},
    //        budget : defaultBudget
    //     });
    //   };

    return (
        <>
            <Navbar bg="light" expand="lg" className="create-button">
                <Container>
                    <Navbar.Brand>Cashendar</Navbar.Brand>
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
                    remainBudget={remainBudget}
                    setRemainBudget={setRemainBudget}
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
