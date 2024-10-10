"use client"
import React, { useState } from 'react'
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
export default function SessionBookingChart() {
  const [data,setData] = useState({
      options: {
          chart: {
            id: "basic-bar",
            toolbar:{
              show:false
            }

          },
          xaxis: {
            categories: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
          },

          yaxis: {
            labels: {
              formatter: function (value) {
                return value + "k";
              }
            }
          },
          title:{
              style: {
                  fontSize:  '16px',
                  fontWeight:  '700',
                  fontFamily:  '',
                  color:  '#2A2D3E'
                },
          },
          dataLabels:{
              enabled:false
          },
          plotOptions: {
              bar: {
                  columnWidth: '25%',
              }
          },
          legend: {
            show: false 
          },
        },
        
        series: [
          {
            name: "Guide",
            data: [30, 40, 45, 50, 49, 60, 70],
            color: "#B8C1EC"
          },
          {
            name: "Subscribers",
            data: [20, 35, 40, 55, 52, 65, 75],
            color: "#000"
          }
        ]
  })
  return (
    <div className='w-full bg-white rounded-xl p-3'>
      <Chart
        options={data.options}
        series={data.series}
        type="bar"
        width="98%"
        height="300px"
      />
    </div>
  )
}
