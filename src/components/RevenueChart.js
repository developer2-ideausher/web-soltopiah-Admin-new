"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function RevenueChart({ subsData, bookingData, timePeriod }) {
  const [data, setData] = useState({
    options: {
      chart: {
        id: "basic-line",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [], // Empty initially, set dynamically based on timePeriod
      },
      yaxis: {
        min: 0, // Minimum value for y-axis
        max: undefined, // Leave undefined for auto-scaling
        labels: {
          // Optional formatter for y-axis labels
        },
      },
      title: {
        style: {
          fontSize: "16px",
          fontWeight: "700",
          color: "#2A2D3E",
        },
      },
      dataLabels: {
        enabled: false, // Disable data labels
      },
      plotOptions: {
        line: {
          curve: "smooth", // Smooth curve for the lines
        },
      },
      stroke: {
        width: [3, 3], // Line widths for both series
        dashArray: [0, 5], // Solid for first line, dashed for second
      },
      colors: ["#0F75BC", "#0F75BC"], // Colors for the lines
      legend: {
        show: false, // Hide legend
      },
    },
    series: [
      {
        name: "Subscriptions",
        data: [], // Initially empty, set dynamically
      },
      {
        name: "Bookings",
        data: [], // Initially empty, set dynamically
      },
    ],
  });

  // Default weekly and monthly categories
  const weeklyCategories = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthlyCategories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const mapDataToPeriod = (data = [], period = "weekly") => {
    const defaultWeeklyData = [
      { day: "sun", count: 0 },
      { day: "mon", count: 0 },
      { day: "tue", count: 0 },
      { day: "wed", count: 0 },
      { day: "thu", count: 0 },
      { day: "fri", count: 0 },
      { day: "sat", count: 0 },
    ];
  
    const defaultMonthlyData = [
      { month: "jan", count: 0 },
      { month: "feb", count: 0 },
      { month: "mar", count: 0 },
      { month: "apr", count: 0 },
      { month: "may", count: 0 },
      { month: "jun", count: 0 },
      { month: "jul", count: 0 },
      { month: "aug", count: 0 },
      { month: "sep", count: 0 },
      { month: "oct", count: 0 },
      { month: "nov", count: 0 },
      { month: "dec", count: 0 },
    ];
  
    if (period === "weekly") {
      return defaultWeeklyData.map((dayObj) => {
        const match = data.find((item) => item.day === dayObj.day);
        return match ? match.count : dayObj.count;
      });
    } else if (period === "monthly") {
      return defaultMonthlyData.map((monthObj) => {
        const match = data.find((item) => item.month === monthObj.month);
        return match ? match.count : monthObj.count;
      });
    }
  };
  
  useEffect(() => {
    // Update categories and data based on the timePeriod
    const categories = timePeriod === "monthly" ? monthlyCategories : weeklyCategories;
  
    setData((prevData) => ({
      ...prevData,
      options: {
        ...prevData.options,
        xaxis: {
          ...prevData.options.xaxis,
          categories, // Set categories based on timePeriod
        },
      },
      series: [
        {
          name: "Bookings",
          data: mapDataToPeriod(bookingData, timePeriod), // Map guide data correctly
        },
        {
          name: "Subsciptions",
          data: mapDataToPeriod(subsData, timePeriod), // Map user data correctly
        },
      ],
    }));
  }, [subsData, bookingData, timePeriod]);
  
  return (
    <div className="w-full bg-white rounded-xl p-3">
      <Chart
        options={data.options}
        series={data.series}
        type="line"
        width="98%"
        height="300px"
      />
    </div>
  );
}
