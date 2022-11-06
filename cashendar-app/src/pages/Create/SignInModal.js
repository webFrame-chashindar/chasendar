import React, { useState, useEffect} from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker";
import { db } from "../../fbase/fbase";
import { addDoc, Firestore } from "firebase/firestore";
import { collection } from "firebase/firestore";

const colorClasses = ["primary","secondary", "info", "warning", "danger"];
// const colorIsSelected = [true,false,false,false,false ];

const SignInModal = ({handleShow, show, onHide}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const [isPlus,setIsPlus] = useState(true);
    const [selColor, setSelColor] = useState('');
    const [selCategory, setSelCategory] = useState('');
    const [categoryCnt, setCategoryCnt] = useState([0,0,0,0,0]);

    const datePickerStyle = {
        display : "inline-block",
        marginRight: "40px"
    }

    const categorySelected = (e) => {
        setSelCategory(e.target.value);
    }

    const eventCollctionRef = collection(db, "finance");
    const saveFinance = async () => {
    await addDoc(eventCollctionRef, 
        {title : title,
        description : description,
        date : date,
        isPlus : isPlus,
        color : selColor,
        category : selCategory});
    setTitle("");
    setDescription("");
    setIsPlus(true);
    setSelCategory("");
    setDate("");
    setSelCategory("");
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
                <Modal.Title id="contained-modal-title-vcenter">Create New Finance</Modal.Title>
            </Modal.Header>

            
            <Modal.Body>
                <Button block variant="info" 
                        type="button" 
                        className="my-3 m-3"
                        onClick={() => setIsPlus(true)}> 수입
                </Button> 
                <Button block variant="info" 
                        type="button" 
                        className="my-3 m-3"
                        onClick={() => setIsPlus(false)}> 지출
                </Button> 
                
                
                {isPlus && 
                <Form>
                    <Form.Group>
                        <Form.Label>수입 금액</Form.Label>
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
                            selected={date}
                            dateFormat="yyyy-MM-dd"
                            onChange= {date => setDate(date)} />
                    </Form.Group >


                    <Form.Group>
                        <Form.Label>카테고리</Form.Label>
                        <Form.Select onChange={categorySelected}>
                            <option>지출 카테고리를 선택하세요</option>
                            <option value="food" >음식</option>
                            <option value="culture">문화</option>
                            <option value="traffic">교통비</option>
                            <option value="doc">의료/건강</option>
                            <option value="etc">기타</option>
                        </Form.Select>
                        
                    </Form.Group>

                    <Button block variant="info" 
                            type="submit" 
                            className="my-3"
                            onClick={() => {
                                {saveFinance()};
                                {handleShow()};
                            }}> 수입 등록
                    </Button> 
                </Form>
                }

                {!isPlus && 
                <Form>
                    <Form.Group>
                        <Form.Label>지출 금액</Form.Label>
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
                            selected={date}
                            dateFormat="yyyy-MM-dd"
                            onChange= {date => setDate(date)} />
                    </Form.Group >

                    <Form.Group>
                        <Form.Label>카테고리</Form.Label>
                        <Form.Select onChange={categorySelected}>
                            <option>수입 카테고리를 선택하세요</option>
                            <option value="pay">월급</option>
                            <option value="pocket">용돈</option>
                            <option value="fin">금융 수입</option>
                            <option value="business">사업 수익</option>
                            <option value="etc">기타</option>
                        </Form.Select>
                        
                    </Form.Group>

                    <Button block variant="info" 
                            type="submit" 
                            className="my-3"
                            onClick={() => {
                                {saveFinance()};
                                {handleShow()};
                            }}> 지출 등록
                    </Button> 
                </Form>
                }
                </Modal.Body>
          </Container>
      </Modal>
    );
};

export default SignInModal;



