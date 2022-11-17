import React from "react";

const DateDetail = (props) => {
    return (
        <>
            <div id="Detail">
                <h3 id="TodayDate">Date: {props.ScheduleDate}</h3>
                <div id="TodaySchedule">
                    <h3 id="daySchedule">일정</h3>
                    <ul>
                        {props.eventList
                            .filter(
                                (item) =>
                                    new Date(item.startD)
                                        .toISOString()
                                        .slice(0, 10) <= props.ScheduleDate &&
                                    new Date(item.endD)
                                        .toISOString()
                                        .slice(0, 10) >= props.ScheduleDate
                            )
                            .map((item, i) => {
                                return <li key={i}>{item.title}</li>;
                            })}
                    </ul>
                </div>
                <div id="TodayInOut">
                    <h3 id="dayInOut">수입과 지출</h3>
                    <ul>
                        {props.financeEList
                            .filter((item) => item.date === props.ScheduleDate)
                            .map((item, i) => {
                                return <li key={i}>{item.title}</li>;
                            })}
                    </ul>
                </div>
            </div>
            ;
        </>
    );
};

export default DateDetail;
