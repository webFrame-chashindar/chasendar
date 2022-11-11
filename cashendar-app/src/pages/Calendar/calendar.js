import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction' // 달력에서 day클릭을 위해
import {db} from '../../fbase/fbase';
import { collection, getDocs } from 'firebase/firestore';
import "./calendar.css"

// 한국 시간으로 맞추기 전 Date 객체
var d = new Date(); // 출력형태 Tue Feb 07 2020 23:25:32 GMT+0900 (KST)

// 빈 이벤트 목록 배열
var Events = []

// 더미 (일정)이벤트 목록
var dummyScheduleEvents = [
  { title: '머리 자르기', date: '2022-11-07' },
  { title: '중간고사 공부하기', date: '2022-11-07' },
  { title: 'event 1', date: '2022-11-22' },
  { title: 'event 2', date: '2022-11-22' },
  { title: 'event 3', date: '2022-11-22' },
  { title: 'event 4', date: '2022-11-09' },
  { title: 'event 5', date: '2022-11-09' },
  { title: 'event 6', date: '2022-11-09' },
  { title: 'event 7', date: '2022-11-09' }
]

// 더미 (수입과 지출)이벤트 목록
var dummyInOutEvents = [
  { title: '+ 30000', date: '2022-11-07' },
  { title: '- 20000', date: '2022-11-07' },
  { title: '+ 20000', date: '2022-11-08' },
  { title: '+ 20000', date: '2022-11-08' },
  { title: '+ 20000', date: '2022-11-08' },
  { title: '+ 20000', date: '2022-11-08' },
  { title: '+ 20000', date: '2022-11-08' },
  { title: '+ 20000', date: '2022-11-08' },
  { title: '+ 20000', date: '2022-11-08' },
  { title: '+ 20000', date: '2022-11-08' },
  { title: '+ 20000', date: '2022-11-08' },
  { title: '+ 20000', date: '2022-11-09' }
]


function Calendar({user}) {
  // 날짜 상태 (오늘의 날짜를 초기값) + 한국 기준 시간으로 변경
  const [ScheduleDate, setScheduleDate] = useState(new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().slice(0, 10));
  //const dateeee = new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().slice(0, 10)
  //console.log(d);
  //console.log(dateeee);
  const [SelectCalendar, setSelectCalendar] = useState(1); // 1 -> 일정 캘린더로 시작
  const [eventList, setEventList] = useState([]);

  // 선택한 모드에 따라 출력할 캘린더 변경
  if (SelectCalendar === 1) {
    Events = dummyScheduleEvents;
  }
  else {
    Events = dummyInOutEvents;
  }

  // 
  const planCollection = collection(db, "plan");
  useEffect(() => {
    const getPlan = async () => {
      const data = await getDocs(planCollection);
      //console.log(data);
      const dataList = data.docs.map((doc)=>({ ...doc.data(), id: doc.id}))
      //const filterList = eventList.filter(value=>value.user === {user});
      const PlanList = dataList.map((value)=>({title: value.title, date: value.startDate.toDate().toISOString().slice(0,10), start: value.startDate.toDate().toISOString().slice(0,10), end: value.endDate.toDate().toISOString().slice(0,10), user: value.user}))

      console.log(PlanList); 
      setEventList(PlanList.filter(value => value.user === user));
      console.log(eventList);
    };

   getPlan();
  },[]);

  
  return (
    <>
      <div id="FullCalendar">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height='100vh'
          locale='ko' // 한국어 설정
          headerToolbar={{
            left: 'today prev,next',
            center: 'title',
            right: 'custom1'
          }}
          dateClick={function (info) {
            setScheduleDate(info.dateStr);
          }}
          // 달력에 표시될 캘린더
          events={
            //Events
            eventList
          }
          selectable='true'
          dayMaxEvents='true' // 달력에 나올 이벤트 갯수 제한
          views={{
            dayGridMonth: {
              dayMaxEvents: 3 // 이벤트 갯수가 3개를 넘어가면 +more 표시
            }
          }}
          customButtons={{
            custom1: {
              text: 'Change View',
              click:
                function () {
                  // 클릭시 달력 출력 모드를 변경한다
                  if (SelectCalendar === 1) {
                    setSelectCalendar(2);
                  }
                  else {
                    setSelectCalendar(1);
                  }
                }
              ,
            },
          }}
        />
      </div>
      <div id="Detail">
        <h3 id="TodayDate">Date: {ScheduleDate}</h3>
        <div id="TodaySchedule">
          <h3 id="daySchedule">일정</h3>
          <ul>
            {dummyScheduleEvents.filter(item => item.date === ScheduleDate)
              .map((item, i) => {
                return <li key={i}>{item.title}</li>;
              })}
          </ul>
        </div>
        <div id="TodayInOut">
          <h3 id="dayInOut">수입과 지출</h3>
          <ul>
            {dummyInOutEvents.filter(item => item.date === ScheduleDate)
              .map((item, i) => {
                return <li key={i}>{item.title}</li>;
              })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Calendar;