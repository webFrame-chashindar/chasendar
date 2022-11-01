import React, { useState} from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker";

const labelsColorClasses = ["primary","secondary", "info", "warning", "danger"];

const EventModal = ({handleShow, show, onHide}) => {

  const datePickerStyle = {
    display : "inline-block",
    marginRight: "40px"
  }

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selColor, setSelColor] = useState('');

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
                            onChange={(e) => setTitle(e.target.value)}/>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>일정 상세</Form.Label>
                        <Form.Control 
                            type="text"
                            name="description"
                            placeholder="일정에 대한 설명을 입력하세요."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>

                    <Form.Group style={datePickerStyle}>
                        <Form.Label>시작 날짜</Form.Label>
                            <DatePicker 
                            className = "form-control"
                            selected={startDate}
                            dateFormat="yyyy-MM-dd"
                            onChange= {date => setStartDate(date)} />
                    </Form.Group >

                    <Form.Group style={datePickerStyle}>
                        <Form.Label>종료 날짜</Form.Label>
                            <DatePicker
                            className = "form-control"
                            selected={endDate}
                            dateFormat="yyyy-MM-dd"
                            onChange={date => setEndDate(date)} />
                    </Form.Group>

                    <Form.Group>
                        
                        <Form.Label>일정 색상</Form.Label>
                        <div className="flex gap-x-2">
                            {labelsColorClasses.map((lblClass, i) => (
                                <span 
                                    key={i}
                                    onClick={() => setSelColor(lblClass)}
                                    className={`top-sticky float-left d-inline-flex justify-content-center m-3 p-3 bg-${lblClass} rounded-circle text-white`}
                                >
                                    {selColor === lblClass && (<span className={`top-sticky float-left d-inline-flex justify-content-center m-3 p-3 bg-${lblClass} rounded-circle text-white`}> V </span> ) }
                                </span>
                            ))}
                        </div>
                        
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>중요도</Form.Label>
                        <Form.Control type="password" placeholder="(대충 중요도 설정하는 부분,,)" />
                    </Form.Group>

                    <Button block variant="info" 
                            type="submit" 
                            className="my-3"
                            onClick={() => handleShow()}> 일정 등록
                    </Button> 
                </Form>
                </Modal.Body>
          </Container>
      </Modal>
    );
};


export default EventModal;



// {show, onHide}
//     <Modal
//     show={show}
//     onHide={onHide}
//     size="lg"
//     aria-labelledby="contained-modal-title-vcenter"
//     centered
//   >
//     <Container>
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">일정 등록</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group>
//             <Form.Label>날짜 입력</Form.Label>
//             <Form.Control placeholder="(구현 못함)" />
//           </Form.Group>

//           <Form.Group>
//             <Form.Label>일정 등록</Form.Label>
//             <Form.Control type="email" placeholder="오늘의 일정을 입력하세요" />
//           </Form.Group>

//           <Form.Group>
//             <Form.Label>중요도</Form.Label>
//             <Form.Control type="password" placeholder="(대충 중요도 설정하는 부분,,)" />
//           </Form.Group>

//           <Button block variant="info" type="button" className="my-3">
//             일정 등록
//           </Button>

//         </Form>
//       </Modal.Body>
//     </Container>
//   </Modal>

// {_handleModal, children, ...rest}
{/* <Container>
        <Background onClick={_handleModal} />
        <ModalBlock {...rest}>   
          <Contents>
              <h2><b>Create New Event</b></h2>
            

            <form className="bg-white rounded-lg shadow-2xl w-1/4"> 
              
                
                  <div>
                    <MyInput
                      type="text"
                      name="title"
                      placeholder="Add title"
                      value={title}
                      className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div> 

                  <div>  
                    <div>
                      <MyInput
                        type="text"
                        name="description"
                        placeholder="Add a description"
                        value={description}
                        className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div> 
                  </div>

                  <div className="calendar-box">
                    <div className="date" style={dateHeaderStyle}><h5>시작날짜</h5></div>
                    <div>
                      <MyDatePicker 
                        selected={startDate}
                        dateFormat="yyyy-MM-dd"
                        onChange= {date => setStartDate(date)} />
                    </div>
                  </div>
                  <div className="calendar-box">
                    <div className="date" style={dateHeaderStyle}><h5>종료날짜</h5></div>
                    <div>
                      <MyDatePicker
                        selected={endDate}
                        dateFormat="yyyy-MM-dd"
                        onChange={date => setEndDate(date)} />
                    </div>
                  </div>

                  <div className="flex gap-x-2">
                    {labelsColorClasses.map((lblClass, i) => (
                      <span key={i}
                        className={`bg-${lblClass}-500 rounded-full flex items-center justify-center cursor-pointer`}
                      >
                      
                        <span className="material-icons-outlined text-white text-sm">
                        V
                      </span>
                    
                </span>
              ))}
            </div>
                    
                  <div>
                    <span className="material-icons-outlined text-gray-400">
                      bookmark_border
                    </span>
                  </div>
                
              
              
              <div>
                
              
              </div>
            </form>
            {children}
          </Contents>
        </ModalBlock>
      </Container> */}





{/* <modal className="modal-dialog" style={modalStyle}>
        <form className="bg-white rounded-lg shadow-2xl w-1/4">
          <div className="modal-header">
            <span className="material-icons-outlined text-gray-400">
              <b>Create New Event</b>
            </span>
              <button className="close" data-dismiss = "modal" aria-label = "Close" onClick={() => setShowEventModal(false)}>
                <span className="material-icons-outlined text-gray-400">
                  X
                </span>
              </button>
          </div>
          <div className="modal-body">
          <div className="p-3">
            <div className="grid grid-cols-1/5 items-end gap-y-7">
              <div></div>
              <input
                type="text"
                name="title"
                placeholder="Add title"
                value={title}
                className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setTitle(e.target.value)}
              />

<div>
              <input
                type="text"
                name="description"
                placeholder="Add a description"
                value={description}
                className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setDescription(e.target.value)}
              />
              </div>

              <div>             
              <div className="calendar-box">
                <div className="date">시작날짜</div>
                <div>
                  <DatePicker 
                    style={datePickerStyle}
                    selected={startDate}
                    dateFormat="yyyy-MM-dd"
                    onChange= {date => setStartDate(date)} />
                </div>
              </div>
              <div className="calendar-box">
                <div className="date">종료날짜</div>
                <div>
                  <DatePicker
                    selected={endDate}
                    dataFormat="yyyy-MM-dd"
                    onChange={date => setEndDate(date)} />
                </div>
              </div>
              </div>
              
              <div>
              <span className="material-icons-outlined text-gray-400">
                select_color
              </span>
              </div>

              <div>
                {/* 일정 반복이나,,, 조금 더 필요한 기능이 있다면 ?? 논의 후 추가. */}
      //         <span>
      //           options.. 
      //         </span>
      //         </div>         
      //       </div>
      //     </div>
      //     </div>
      //     <div className="modal-footer">
      //       <button type="submit">
      //         Save
      //       </button>
      //     </div>
      //   </form>
      // </modal> *}

