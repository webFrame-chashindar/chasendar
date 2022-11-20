import { issuedAtTime } from "@firebase/util";
import React from "react";
import { CarouselItem } from "react-bootstrap";
import "./dateDetail.css";

const DateDetail = ({ user, ScheduleDate, eventList, financeEList }) => {
    return (
        <div id="Detail">
            <p id="TodayDate">{ScheduleDate}</p>
            <div id="TodaySchedule">
                <div class="list-group" id="daySchedule">
                    <a
                        href="#"
                        class="list-group-item list-group-item-action active"
                    >
                        일정
                    </a>
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
                            return (
                                <li
                                    key={i}
                                    class="list-group-item list-group-item-action disabled"
                                >
                                    {item.title}
                                </li>
                            );
                        })}
                </div>
            </div>
            <div id="TodayInOut">
                <div class="list-group" id="daySchedule">
                    <a
                        id="dayInOut"
                        href="#"
                        class="list-group-item list-group-item-action active"
                    >
                        수입 및 지출
                    </a>
                    {financeEList
                        .filter((item) => item.date === ScheduleDate)
                        .map((item, i) => {
                            return (
                                <li
                                    key={i}
                                    class="list-group-item list-group-item-action disabled"
                                >
                                    {item.isPlus ? (
                                        <p class="item_amount">{item.title}</p>
                                    ) : (
                                        <p class="item_amount" id="plus">
                                            {item.title}
                                        </p>
                                    )}
                                    <p class="item_title">{item.titleF}</p>
                                </li>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default DateDetail;
