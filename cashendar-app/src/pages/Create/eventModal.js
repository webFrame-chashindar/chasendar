import React, { useState, useEffect} from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css"
import { db } from "../../fbase/fbase";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import { FirebaseError } from "firebase/app";
import { addDoc, Firestore } from "firebase/firestore";
import { collection } from "firebase/firestore";

const labelsColorClasses = ["primary","secondary", "info", "warning", "danger"];
const labelsColorIsSelected = [true,false,false,false,false ];

const EventModal = ({user, handleShow, show, onHide,
    //변경
    buttonClick = f => f}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(); 
  const [endDate, setEndDate] = useState(); 
  const [selColor, setSelColor] = useState('');

  const datePickerFormStyle = {
    display : "inline-block",
    marginRight: "40px"
  }


  const selectColor = (span) => {
    console.log("here");
    span.style.border = "2px solid black";
  }

  const func = function(){
    ('.datepicker').datepicker({
       format: 'mm-dd-yyyy'
     });
 };

const eventCollctionRef = collection(db, "plan");
const saveEvent = async () => {
    await addDoc(eventCollctionRef, 
        {user : user,
        title : title,
        description : description,
        startDate : startDate,
        endDate : endDate,
        color: selColor});
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setSelColor("");
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
                <Modal.Title id="contained-modal-title-vcenter">Create New Event</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>일정 제목</Form.Label>
                        <Form.Control 
                            type="text"
                            name="title"
                            placeholder="일정의 제목을 입력하세요."
                            value={title}
                            onChange={(e) => {setTitle(e.target.value)}}/>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>일정 상세</Form.Label>
                        <Form.Control 
                            type="text"
                            name="description"
                            placeholder="일정에 대한 설명을 입력하세요."
                            value={description}
                            onChange={(e) => {setDescription(e.target.value)}} />
                    </Form.Group>

                    <Form.Group style={datePickerFormStyle}>
                        <Form.Label>시작 날짜</Form.Label>
                        <DatePicker 
                            className = "form-control"
                            selected={startDate}
                            dateFormat="yyyy-MM-dd HH:mm"    
                            onChange= {date => {setStartDate(date)}}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeCaption="time"
                            timeIntervals={10} />
                    </Form.Group>


                    <Form.Group style={datePickerFormStyle}>
                        <Form.Label>종료 날짜</Form.Label>
                        <DatePicker 
                            className = "form-control"
                            selected={endDate}
                            dateFormat="yyyy-MM-dd HH:mm"    
                            onChange= {date => {setEndDate(date)}}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeCaption="time"
                            timeIntervals={10} />
                    </Form.Group>

                    <Form.Group>  
                        <Form.Label>일정 색상</Form.Label>
                        <div>
                            {labelsColorClasses.map((lblClass, i) => (
                                <span
                                    key={i}
                                    onClick={() => {{setSelColor(lblClass);} 
                                        {(lblClass === selColor &&labelsColorIsSelected[i] === true) ? labelsColorIsSelected[i] = false : labelsColorIsSelected[i] = true };
                                    }}
                                    className={(lblClass === selColor && labelsColorIsSelected[i]) ? `border border-5 top-sticky float-left d-inline-flex m-3 p-3 bg-${lblClass} rounded-circle text-white` : `top-sticky float-left d-inline-flex m-3 p-3 bg-${lblClass} rounded-circle text-white`}               
                                >
                                </span>
                            ))}
                        </div>
                    </Form.Group>

                    <Button block variant="info" 
                            className="my-3"
                            onClick={() => {
                                {saveEvent()};
                                {handleShow()};
                                // 변경
                                {buttonClick(true)}
                            }}> 일정 등록
                    </Button> 
                </Form>
                </Modal.Body>
          </Container>
      </Modal>
    );
};


export default EventModal;
