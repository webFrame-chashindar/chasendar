
import React, { useState } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import SignInModal from './SignInModal'; //일단 넣어놓음
import EventModal from './eventModal';

export default function CreateEventButton(){
    const [showEventModal, setShowEventModal] = useState(false);
    const [showSignInModalOn, setShowSignInModalOn] = useState(false);

    const handleShowEventModal = () => {
        setShowEventModal(false);
    }

    const handleShowSignInModal = () =>{
        setShowSignInModalOn(false);
    }

    return (
        <header>
            <Navbar bg="light" expand="lg">
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
             {showEventModal && <EventModal handleShow = {handleShowEventModal} show={showEventModal} onHide={() => setShowEventModal(false)}/> }
             {showSignInModalOn && <SignInModal handleShow = {handleShowSignInModal} show={showSignInModalOn} onHide={() => setShowSignInModalOn(false)}/> }
             </header>
       
    //    </>
  );
}
  



