import { issuedAtTime } from "@firebase/util";
import React from "react";
import { useState, useMemo, useEffect } from "react";
import { CarouselItem } from "react-bootstrap";
import "./dateDetail.css";
import { db } from "../../fbase/fbase";
import { collection, getDocs, query, where, deleteDoc } from "firebase/firestore";

const DateDetail = ({ user, ScheduleDate, eventList, financeEList, buttonClick2 = f => f }) => {

    const planCollection = collection(db, "plan"); // 파이어스토어 plan 컬렉션
    const financeCollection = collection(db, "finance"); // 파이어스토어 finance 컬렉션

    const removePlan = async (item) => {
        console.log(item.title)
        console.log(item.pureStart)
        console.log(item.pureEnd)
        const data = await getDocs(query(planCollection,
            where('title', '==', item.title),
            where('startDate', '==', item.pureStart),
            where('endDate', '==', item.pureEnd)));
        if (data.docs.length !== 0) {
            await deleteDoc(data.docs[0].ref);
        }
    }

    function planClick(item) {
        console.log("삭제함수");
        if (window.confirm("일정을 삭제하시겠습니까?")) {
            removePlan(item);
            buttonClick2(true);
            alert("삭제 완료");
        } else {
        }
    }

    const removeFinance = async (item) => {
        const data = await getDocs(query(financeCollection,
            where('title', '==', item.titleF),
            where('date', '==', item.pureDate),
            where('amount', '==', item.title)));
        if (data.docs.length !== 0) {
            await deleteDoc(data.docs[0].ref);
        }
    }

    function financeClick(item) {
        console.log("삭제함수");
        if (window.confirm("수입 및 지출을 삭제하시겠습니까?")) {
            removeFinance(item);
            buttonClick2(true);
            alert("삭제 완료");
        } else {
        }
    }
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
                                    onClick={() => {
                                        { planClick(item) };
                                    }}
                                    key={i}
                                    class="list-group-item"
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
                                    onClick={() => {
                                        { financeClick(item) };
                                    }}
                                    key={i}
                                    class="list-group-item"
                                    // class="list-group-item list-group-item-action disabled"
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