import React, {
    useState,
    useEffect,
    useImperativeHandle,
    forwardRef,
} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // 달력에서 day클릭을 위해

import { db } from "../../fbase/fbase";
import {
    collection,
    getDoc,
    setDoc,
    doc,
    query,
    orderBy,
    onSnapshot,
} from "firebase/firestore";
import { useMemo } from "react";

import "./calendar.css";
import DateUnselected from "../DateSelected/dateUnselected";
import DateDetail from "../DateSelected/dateDetail";

// 한국 시간으로 맞추기 전 Date 객체
var d = new Date(); // 출력형태 Tue Feb 07 2020 23:25:32 GMT+0900 (KST)

// 빈 이벤트 목록 배열
var Events = [];

const Calendar = forwardRef(
    (
        {
            user,
            defaultBudget,
            setDefaultBudget,
            change,
            setChange,
            plus,
            setPlus,
            minus,
            setMinus,
        },
        ref
    ) => {
        function functionWhichParentNeed() {
            getPlan();
            getFinance();
        }
        useImperativeHandle(ref, () => ({
            functionWhichParentNeed,
        }));
        // 날짜 상태 (오늘의 날짜를 초기값) + 한국 기준 시간으로 변경
        const [ScheduleDate, setScheduleDate] = useState(
            new Date(d.getTime() - d.getTimezoneOffset() * 60000)
                .toISOString()
                .slice(0, 10)
        );
        const [SelectCalendar, setSelectCalendar] = useState(1); // 1 -> 일정 캘린더로 시작
        const [eventList, setEventList] = useState([]); // 일정 목록 저장 상태
        const [financeEList, setFinanceEList] = useState([]); // 수입 지출 목록 저장 상태
        const [selectedDate, selSelectedDate] = useState(false); // 날 선택 여부

        var planList = [];
        var financeList = [];

        // 선택한 모드에 따라 출력할 캘린더 변경
        if (SelectCalendar === 1) {
            Events = eventList;
        } else {
            Events = financeEList;
        }

        const planCollection = collection(db, "plan"); // 파이어스토어 plan 컬렉션
        const financeCollection = collection(db, "finance"); // 파이어스토어 finance 컬렉션

        const getPlan = async () => {
            const data = query(planCollection, orderBy("startDate", "asc"));
            onSnapshot(data, (querySnapshot) => {
                const planList2 = [];
                querySnapshot.forEach((doc) => {
                    planList2.push(doc.data());
                });
                planList = planList2.map((value) => ({
                    title: value.title,
                    pureStart: value.startDate,
                    pureEnd: value.endDate,
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
                        value.color === "info"
                            ? "#6cc3d5"
                            : value.color === "secondary"
                                ? "#f3969a"
                                : value.color === "danger"
                                    ? "#ff7851"
                                    : value.color === "warning"
                                        ? "#ffce67"
                                        : value.color === "primary"
                                            ? "#78c2ad"
                                            : value.color,
                    borderColor:
                        value.color === "info"
                            ? "#6cc3d5"
                            : value.color === "secondary"
                                ? "#f3969a"
                                : value.color === "danger"
                                    ? "#ff7851"
                                    : value.color === "warning"
                                        ? "#ffce67"
                                        : value.color === "primary"
                                            ? "#78c2ad"
                                            : value.color,
                    description: value.description,
                    checkDate: new Date(
                        value.startDate.toDate().getTime() -
                        value.startDate.toDate().getTimezoneOffset() * 60000
                    ).toISOString(),
                }));
                setEventList(planList.filter((value) => value.user === user));
            });
        };

        const getFinance = async () => {
            const data = query(financeCollection, orderBy("date", "asc"));
            onSnapshot(data, (querySnapshot) => {
                const financeList2 = [];
                querySnapshot.forEach((doc) => {
                    financeList2.push(doc.data());
                });
                financeList = financeList2.map((value) => ({
                    titleF: value.title,
                    title: value.amount,
                    category: value.category,
                    pureDate: value.date,
                    date: new Date(
                        value.date.toDate().getTime() -
                        value.date.toDate().getTimezoneOffset() * 60000
                    )
                        .toISOString()
                        .slice(0, 10),
                    isBudet: value.isBudet,
                    isPlus: value.isPlus,
                    // 수입, 지출 색 설정
                    backgroundColor: value.isPlus ? "#0d6efd" : "#F05650",
                    borderColor: value.isPlus ? "#0d6efd" : "#F05650",
                    user: value.user,
                }));
                setFinanceEList(
                    financeList.filter((value) => value.user === user)
                );
            });
        };

        useEffect(() => {
            getPlan();
            getFinance();
        }, []);

        useMemo(async () => {
            const userInfoRef = doc(db, "userInfo", user);
            const userInfoDoc = await getDoc(userInfoRef);
            if (userInfoDoc.exists()) {
                setDefaultBudget(userInfoDoc.data().budget);
                setChange(userInfoDoc.data().change);
                setPlus(userInfoDoc.data().plus);
                setMinus(userInfoDoc.data().minus);
            } else {
                setDefaultBudget(1000000);
                setChange(0);
                setPlus(0);
                setMinus(0);
                userInfoRef = await setDoc(doc(db, "userInfo", user), {
                    user: user,
                    budget: 1000000,
                    change: 0,
                    plus: 0,
                    minus: 0
                });
            }
        }, [user])

        return (
            <div className="calendar-container">
                <div className="calendar-body">
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
                                // 누르면 선택 날을 바꾼다
                                // 같은날 클릭시 && selectedDate = true일 경우 선택 해제
                                if (
                                    ScheduleDate === info.dateStr &&
                                    selectedDate
                                ) {
                                    selSelectedDate(false);
                                    this.unselect();
                                } else {
                                    selSelectedDate(true);
                                    setScheduleDate(info.dateStr);
                                }
                            }}
                            // 달력에 표시될 캘린더
                            events={Events}
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
                        <DateDetail
                            clssName="dateDetail"
                            user={user}
                            ScheduleDate={ScheduleDate}
                            eventList={eventList}
                            getPlane={getPlan}
                            getFinance={getFinance}
                            financeEList={financeEList}
                        />
                    )}
                    {!selectedDate && (
                        <DateUnselected

                            className="dateSelected"
                            user={user}
                            eventList={eventList}
                            financeEList={financeEList}
                            defaultBudget={defaultBudget}
                            setDefaultBudget={setDefaultBudget}
                            change={change}
                            setChange={setChange}
                            plus={plus}
                            minus={minus}
                            curMonth={new Date().getMonth() + 1}
                        />
                    )}
                </div>
            </div>
        );
    }
);

export default Calendar;
