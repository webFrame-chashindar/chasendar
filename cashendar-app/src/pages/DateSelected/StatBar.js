import React from "react";
import { Bar } from 'react-chartjs-2';

const StatBar = function() {
    const data = {
        labels: ["first", "second", "third", "4th", "5th"],
        datasets: [
          {
            label: "First set",
            data: [1, 2, 4, 8, 20],
            backgroundColor: "blue"
          }
        ]
      };
    
      const options = {
        responsive: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                drawBorder: false,
                borderDash: [3, 3],
                zeroLineColor: "blue"
              },
              categoryPercentage: 0.7,
              barPercentage: 0.9,
              ticks: {
                beginAtZero: true
              }
            }
          ],
          yAxes: [
            {
              display: false,
              gridLines: {
                display: false,
                zeroLineColor: "transparent"
              },
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      };
      return (
        <div className="App">
          <h1>Hello CodeSandbox</h1>
          <h2>Start editing to see some magic happen!</h2>
          <Bar width="200" height="200" data={data} options={options} />
        </div>
      );
};

export default StatBar;
