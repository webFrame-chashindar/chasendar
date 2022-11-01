import React, { useState, useEffect} from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker";

const SignInModal = ({handleShow, show, onHide}) => {
  
  return (
    <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Container>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Create New Finance</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>일정 제목</Form.Label>
                        <Form.Control 
                            type="text"
                            name="title"
                            placeholder="내용"
                            />
                    </Form.Group>

                    
                    <Button block variant="info" 
                            type="submit" 
                            className="my-3"
                            onClick={() => handleShow()}> 소비 등록
                    </Button> 
                </Form>
                </Modal.Body>
          </Container>
      </Modal>
    );
};


export default SignInModal;



