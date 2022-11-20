import React from "react";
import DateSelected from "./dateselected";
import { Stack } from "react-bootstrap";
import { useState, useEffect, useMemo } from "react";
import BudgetModal from "./setBudgetModal"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction' // 달력에서 day클릭을 위해
import ReactApexChart from 'react-apexcharts';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../fbase/fbase";

function Date({user, eventList,financeEList, defaultBudget, setDefaultBudget, change, setChange, curMonth}) {
    const category = ["food", "culture", "traffic", "doc", "etc"];
    const categoryCnt = [0,0,0,0,0];

    const [showBudgetModal, setShowBudgetModal] = useState(false);
    const handleBudgetModal = () => {
        setShowBudgetModal(false);
    }

    // const financeList = [];

    useMemo(() => {
      for(var i in category){
        categoryCnt[i] = financeEList.filter( f => f.category === category[i]).length
      }
    });

  console.log(` : ${categoryCnt[1]}`)
  
    const chartOpt = {
        series: [{
          name: 'count',
          data: [categoryCnt[0],categoryCnt[1],categoryCnt[2],categoryCnt[3],categoryCnt[4]]
        }],
        options: {
          chart: {
            height: 250,
            type: 'bar',
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: 'top', // top, center, bottom
              },
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val + "%";
            },
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ["#304758"]
            }
          },
          
          xaxis: {
            categories: [category[0],category[1],category[2],category[3],category[4]],
            position: 'bottom',
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            crosshairs: {
              fill: {
                type: 'gradient',
                gradient: {
                  colorFrom: '#D8E3F0',
                  colorTo: '#BED1E6',
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
                }
              }
            },
            tooltip: {
              enabled: true,
            }
          },
          yaxis: {
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: false,
              formatter: function (val) {
                return val + "%";
              }
            }
          
          },
          title: {
            text: '카테고리별 지출 통계',
            floating: true,
            offsetY: 220,
            align: 'center',
            style: {
              color: '#444'
            }
          }
        },
      };
    

    //var budgetPercentage = parseInt((remainBudget / defaultBudget) *100);
    const budgetPercentage = parseInt((parseInt(parseInt(defaultBudget)+parseInt(change)) / parseInt(defaultBudget)) * 100);

    console.log(`date default :: ${parseInt(parseInt(defaultBudget)+parseInt(change)) / parseInt(defaultBudget)}`);
    // console.log(`date remain :: ${dd}`);

    return <>
    <div id="Detail">
        <h4 id="MonthlyInfo">Monthly Info</h4>
        <Stack className="mt-4 m-1" gap={3}>
            <button type="button" class="btn btn-outline-primary" onClick = {() => setShowBudgetModal(true)}>
                예산설정</button>
            <div class="list-group mb-2">
                <span class="list-group-item list-group-item-action active"><h5>이달의 예산</h5></span>
                <span class="list-group-item list-group-item-action"> 예산 중 남은 잔액
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: `${budgetPercentage}%`}}></div>
                    </div>
                    
                </span>
                {showBudgetModal && <BudgetModal user={user} defaultBudget = {defaultBudget} setDefaultBudget = {setDefaultBudget} handleShow = {handleBudgetModal} show={showBudgetModal} onHide={() => setShowBudgetModal(false)}/>}
                    
                {/* parseInt(change) === NaN ? defaultBudget : parseInt(defaultBudget) + parseInt(change) */}
                <span class="list-group-item list-group-item-action disabled">잔여 예산 : {parseInt(defaultBudget) + parseInt(change)}</span> 

            </div>

            <div class="list-group mb-2">
                <span class="list-group-item list-group-item-action active"><h5>이달의 소비</h5></span>
                <span class="list-group-item list-group-item-action">
                <div id="chart">
                    <ReactApexChart options={chartOpt.options} series={chartOpt.series} type="bar" height={250} />
                </div>

                </span>
            </div>

            <div class="list-group">
                <span class="list-group-item list-group-item-action active"><h5>이달의 일정</h5></span>
                {eventList.map((e, i) => (parseInt(curMonth) === parseInt(e.start.slice(5,7))) && 
                    <span class="list-group-item list-group-item-action">
                        <fieldset class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id={e.title + e.start}></input>
                                <label class="form-check-label" for={e.title + e.start}>
                                    <h6><b>{e.start.slice(0,10)}</b></h6>
                                    <p>{e.title}</p>
                                </label>
                            </div>
                        </fieldset>
                    </span>         
                )}        
            </div>
        </Stack>
    </div>
    </>;
    }


export default Date;



{/* <div className="bg-light border">
                    <h3>이달의 예산</h3>
                    <button type="button" class="btn btn-lg btn-outline-primary mb-2">
                        예산 설정</button>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: "70%"}}></div>
                    </div>
                </div>
                <div className="bg-light border">
                <h3>이달의 소비</h3>
                

                </div>
                <div className="bg-light border">
                    <h3>이달의 일정</h3>
                    
                </div> */}
