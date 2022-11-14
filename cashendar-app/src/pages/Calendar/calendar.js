import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // 달력에서 day클릭을 위해
import { db } from "../../fbase/fbase";
import { collection, getDocs } from "firebase/firestore";
import "./calendar.css";
import DateSelected from "../DateSelected/dateselected";

import CreateEventButton from "../Create/createEventButton";

// 한국 시간으로 맞추기 전 Date 객체
var d = new Date(); // 출력형태 Tue Feb 07 2020 23:25:32 GMT+0900 (KST)

// 빈 이벤트 목록 배열
var Events = [];

function Calendar({
    user,
    defaultBudget,
    setDefaultBudget,
    remainBudget,
    setRemainBudget,
}) {
    // 날짜 상태 (오늘의 날짜를 초기값) + 한국 기준 시간으로 변경
    const [ScheduleDate, setScheduleDate] = useState(
        new Date(d.getTime() - d.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 10)
    );
    const [SelectCalendar, setSelectCalendar] = useState(1); // 1 -> 일정 캘린더로 시작
    const [eventList, setEventList] = useState([]); // 일정 목록 저장 상태
    const [financeEList, setFinanceEList] = useState([]); // 수입 지출 목록 저장 상태
    const [selectedDate, selSelectedDate] = useState(false);
    // 변경
    const [buttonClick, setButtonClick] =useState(false);

    var planList = [];
    var financeList = [];

    // 선택한 모드에 따라 출력할 캘린더 변경
    if (SelectCalendar === 1) {
        Events = eventList;
    } else {
        Events = financeEList;
    }

    const planCollection = collection(db, "plan");
    const financeCollection = collection(db, "finance");

    //변경 코드
    const getPlan = async () => {
        const data = await getDocs(planCollection);
        //console.log(data);
        const dataList = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        planList = dataList.map((value) => ({
            title: value.title,
            start: value.startDate.toDate().toISOString(),
            end: value.endDate.toDate().toISOString(),
            startD: value.startDate
                .toDate()
                .setHours(value.startDate.toDate().getHours() + 9),
            endD: value.endDate
                .toDate()
                .setHours(value.endDate.toDate().getHours() + 9),
            user: value.user,
            // 색 변경 문자열로 바뀌면 backgroundColor: value.color 로 바꿀 것
            backgroundColor: 
            (value.color=="info")?"#54B4D3":(value.color=="secondary")
            ?"#9FA6B2":(value.color=="danger")
            ?"#DC4C64":(value.color=="warning")
            ?"#E4A11B":(value.color=="primary")
            ?"#3B71CA":value.color,
            borderColor: 
            (value.color=="info")?"#54B4D3":(value.color=="secondary")
            ?"#9FA6B2":(value.color=="danger")
            ?"#DC4C64":(value.color=="warning")
            ?"#E4A11B":(value.color=="primary")
            ?"#3B71CA":value.color,
            description: value.description,
        }));
        console.log(planList);
        setEventList(planList.filter((value) => value.user === user));
        // eventList = planList.filter(plan => plan.user === user);
        console.log(eventList);
    };

    const getFinance = async () => {
        const data = await getDocs(financeCollection);
        const dataList = data.docs.map((doc)=>({
            ...doc.data(),
            id: doc.id,
        }));
        financeList = dataList.map((value)=>({
            titleF: value.title,
            title: value.amount,
            category: value.category,
            date: new Date(((value.date).toDate()).getTime() - ((value.date).toDate().getTimezoneOffset()*60000))
                .toISOString()
                .slice(0, 10),
            isBudet: value.isBudet,
            isPlus: value.isPlus,
            // 수입, 지출 색 설정
            backgroundColor: value.isPlus?"#0d6efd":"#F05650",
            borderColor:value.isPlus?"#0d6efd":"#F05650",
            user: value.user,
        }));
        console.log(planList);
        setFinanceEList(financeList.filter((value) => value.user === user));
        console.log(financeEList);
    };
    //변경
    if(buttonClick == true){
        getPlan();
        getFinance();
        setButtonClick(false);
    }
    useEffect(() => {
        getPlan();
        getFinance();
    }, []);

    return (
        <div className="calendar-container">
            <div className="calendar-body">
                <CreateEventButton
                    className="create-botton-container"
                    user={user}
                    defaultBudget={defaultBudget}
                    setDefaultBudget={setDefaultBudget}
                    remainBudget={remainBudget}
                    setRemainBudget={setRemainBudget}
                    //변경
                    buttonClick={(check)=> setButtonClick(check)}
                />
                <div id="FullCalendar">
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        height="100vh"
                        locale="ko" // 한국어 설정
                        headerToolbar={{
                            left: "today prev,next",
                            center: "title",
                            right: "custom1",
                        }}
                        dateClick={function (info) {
                            if (selectedDate) {
                                selSelectedDate(false);
                            } else {
                                selSelectedDate(true);
                                setScheduleDate(info.dateStr);
                            }
                        }}
                        // 달력에 표시될 캘린더
                        events={
                            Events
                            // eventList
                        }
                        selectable="true"
                        dayMaxEvents="true" // 달력에 나올 이벤트 갯수 제한
                        views={{
                            dayGridMonth: {
                                dayMaxEvents: 3, // 이벤트 갯수가 3개를 넘어가면 +more 표시
                            },
                        }}
                        customButtons={{
                            custom1: {
                                text: "Change View",
                                click: function () {
                                    // 클릭시 달력 출력 모드를 변경한다
                                    if (SelectCalendar === 1) {
                                        setSelectCalendar(2);
                                    } else {
                                        setSelectCalendar(1);
                                    }
                                },
                            },
                        }}
                    />
                </div>
            </div>
            <div className="stat">
                {selectedDate && (
                    <div id="Detail">
                        <h3 id="TodayDate">Date: {ScheduleDate}</h3>
                        <div id="TodaySchedule">
                            <h3 id="daySchedule">일정</h3>
                            <ul>
                                {eventList
                                    .filter(
                                        (item) =>
                                            new Date(item.startD)
                                                .toISOString()
                                                .slice(0, 10) <= ScheduleDate &&
                                            new Date(item.endD)
                                                .toISOString()
                                                .slice(0, 10) >= ScheduleDate
                                    )
                                    .map((item, i) => {
                                        return <li key={i}>{item.title}</li>;
                                    })}
                            </ul>
                        </div>
                        <div id="TodayInOut">
                            <h3 id="dayInOut">수입과 지출</h3>
                            <ul>
                                {financeEList
                                    .filter(
                                        (item) => item.date === ScheduleDate
                                    )
                                    .map((item, i) => {
                                        return <li key={i}>{item.title}</li>;
                                    })}
                            </ul>
                        </div>
                    </div>
                )}
                {!selectedDate && (
                    <DateSelected
                        className="dateSelected"
                        user={user}
                        eventList={eventList}
                        defaultBudget={defaultBudget}
                        setDefaultBudget={setDefaultBudget}
                        remainBudget={remainBudget}
                        curMonth={new Date().getMonth() + 1}
                    />
                )}
            </div>
        </div>
    );
}

export default Calendar;
