import React, { useState } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import SignInModal from './../pages/Create/SignInModal'; //일단 넣어놓음
import EventModal from './../pages/Create/eventModal';

const Header = () => {
  const [showEventModal, setShowEventModal] = useState(false);
  const [signInModalOn, setSignInModalOn] = useState(false);
  return (
    <>
      <EventModal
        show={showEventModal}
        onHide={() => setShowEventModal(false)}
      />
      <SignInModal
        show={signInModalOn}
        onHide={() => setSignInModalOn(false)}
      />
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
                    onClick={() => setSignInModalOn(true)}
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
      </header>
    </>
  );
};

export default Header;