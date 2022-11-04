//import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

function Calendar() {
  return (
    <div>
      <div id="FullCalendar">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          height='100vh' // 세로 길이
          locale='ko' // 한국어 설정
          headerToolbar={{ // 툴바 위치 설정
            left: 'title',
            center: '',
            right: 'today prev,next'
          }}
        />
      </div>
      <div id="Detail">
        세부사항
      </div>
    </div>
  )
}

export default Calendar;