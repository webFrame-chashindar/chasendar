import React from 'react'
import { Modal, Button, Form, Container } from "react-bootstrap";
import { db } from "../../fbase/fbase";
import { updateDoc, doc } from 'firebase/firestore';

export default function setBudgetModal({user, defaultBudget, setDefaultBudget, handleShow, show, onHide}) {
    const updateUserInfo = async () => {
        console.log(`update success ${user}`)
        await updateDoc(doc(db, "userInfo", {user}), {
           user : {user},
           budget : defaultBudget
        });
      };
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
                <Modal.Title id="contained-modal-title-vcenter">Setting Your Budget</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                    <Form.Label>이번달 예산을 입력하세요.</Form.Label>
                        <Form.Control 
                            type="text"
                            name="title"
                            placeholder={defaultBudget}
                            value={defaultBudget}
                            onChange={(e) => {
                                setDefaultBudget(e.target.value);
                                updateUserInfo(); }}/>
                    </Form.Group>

                    <Button block variant="info" 
                            className="my-3"
                            onClick={() => {handleShow()}}> 예산 등록
                    </Button> 
                </Form>
                </Modal.Body>
          </Container>
      </Modal>
  )
}
