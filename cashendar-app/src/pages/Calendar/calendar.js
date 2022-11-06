import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction' // 달력에서 day클릭을 위해
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

function Calendar() {
  // 날짜 상태 (오늘의 날짜를 초기값) + 한국 기준 시간으로 변경
  const [ScheduleDate, setScheduleDate] = useState(new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().slice(0, 10));
  const [SelectCalendar, setSelectCalendar] = useState(1); // 1 -> 일정 캘린더
  //console.log(ScheduleDate);

  // 선택한 모드에 따라 출력할 캘린더 변경
  if (SelectCalendar === 1) {
    Events = dummyScheduleEvents;
  }
  else
    Events = dummyInOutEvents;

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
            //alert('Clicked on: ' + info.dateStr);
            setScheduleDate(info.dateStr);
          }}
          // 달력에 표시될 캘린더
          events={
            Events
          }
          selectable='true'
          dayMaxEvents='true' // for all non-TimeGrid views
          views={{
            dayGridMonth: {
              dayMaxEvents: 3 // adjust to 6 only for timeGridWeek/timeGridDay
            }
          }}
          customButtons={{
            custom1: {
              text: 'Change View',
              click:
                function () {
                  //alert(SelectCalendar);
                  // 클릭시 달력 출력 모드를 변경한다
                  if (SelectCalendar === 1)
                    setSelectCalendar(2);
                  else
                    setSelectCalendar(1);
                }
              ,
            },
          }}
        />
      </div>
      <div id="Detail">
        <div id="TodaySchedule">
          <h3 id="daySchedule">오늘의 일정</h3>
          <ul>
            {dummyScheduleEvents.filter(item => item.date === ScheduleDate)
              .map((item, i) => {
                console.log(item.title);
                return <li key={i}>{item.title}</li>;
              })}
          </ul>
        </div>
        <div id="TodayInOut">
          <h3 id="dayInOut">오늘의 수입과 지출</h3>
          <ul>
            {dummyInOutEvents.filter(item => item.date === ScheduleDate)
              .map((item, i) => {
                console.log(item.title);
                return <li key={i}>{item.title}</li>;
              })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Calendar;

// 나중에 쓸지도 모르는 코드
// 클릭 알림창
// Swal.fire({
//   title: 'Date',
//   text: arg.dateStr,
//   type: 'success',
// })
// 원형
// dateClick: function(info) {
//   alert('Clicked on: ' + info.dateStr);
//   alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
//   alert('Current view: ' + info.view.type);
//   // change the day's background color just for fun
//   info.dayEl.style.backgroundColor = 'red';
// }