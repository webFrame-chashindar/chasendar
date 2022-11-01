import React, { useState, useEffect} from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker";

const labelsColorClasses = ["primary","secondary", "info", "warning", "danger"];
const labelsColorIsSelected = [true,false,false,false,false ];

const SignInModal = ({handleShow, show, onHide}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [selColor, setSelColor] = useState('');

    const datePickerStyle = {
        display : "inline-block",
        marginRight: "40px"
    }

    const selectColor = (span) => {
        console.log("here");
        span.style.border = "2px solid black";
    }
  
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
                        <Form.Label>수입 등록</Form.Label>
                        <Form.Control 
                            type="text"
                            name="title"
                            placeholder="금액을 입력하세요."
                            />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>지출 등록</Form.Label>
                        <Form.Control 
                            type="text"
                            name="title"
                            placeholder="금액을 입력하세요."
                            />
                    </Form.Group>

                    <Form.Group style={datePickerStyle}>
                        <Form.Label>날짜 등록</Form.Label>
                            <DatePicker 
                            className = "form-control"
                            selected={startDate}
                            dateFormat="yyyy-MM-dd"
                            onChange= {date => setStartDate(date)} />
                    </Form.Group >

                    <Form.Group>
                        
                        <Form.Label>수입/지출등록 색상</Form.Label>
                        <div>
                            {labelsColorClasses.map((lblClass, i) => (
                                <span
                                    key={i}
                                    onClick={() => {setSelColor(lblClass); 
                                        {(lblClass === selColor &&labelsColorIsSelected[i] === true) ? labelsColorIsSelected[i] = false : labelsColorIsSelected[i] = true };
                                    }}
                                    className={(lblClass === selColor && labelsColorIsSelected[i]) ? `border border-5 top-sticky float-left d-inline-flex m-3 p-3 bg-${lblClass} rounded-circle text-white` : `top-sticky float-left d-inline-flex m-3 p-3 bg-${lblClass} rounded-circle text-white`}               
                                >
                                </span>
                            ))}
                        </div>
                        
                    </Form.Group>

                    <Button block variant="info" 
                            type="submit" 
                            className="my-3"
                            onClick={() => handleShow()}> 수입/지출 등록
                    </Button> 
                </Form>
                </Modal.Body>
          </Container>
      </Modal>
    );
};

export default SignInModal;



