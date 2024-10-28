"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function SessionBookingChart({ subscriberData, guideData, timePeriod }) {
  const [data, setData] = useState({
    options: {
      chart: {
        id: "revenue-line",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [], // Empty initially, set dynamically based on timePeriod
      },
      yaxis: {
        min: 0,
        labels: {
          formatter: function (value) {
            return "$" + value ;
          },
        },
      },
      stroke: {
        width: [3, 3],
        dashArray: [0, 5],
      },
      colors: ["#DADADA", "#000"],
      legend: {
        show: false,
      },
    },
    series: [
      {
        name: "Guides",
        data: [], // Initially empty, will be updated
      },
      {
        name: "Subscribers",
        data: [], // Initially empty, will be updated
      },
    ],
  });

  // Weekly and monthly category labels
  const weeklyCategories = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthlyCategories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Helper function to map guide and subscriber data to appropriate periods
  const mapDataToPeriod = (data = [], period = "weekly") => {
    const defaultWeeklyData = [
      { day: "sun", revenue: 0 },
      { day: "mon", revenue: 0 },
      { day: "tue", revenue: 0 },
      { day: "wed", revenue: 0 },
      { day: "thu", revenue: 0 },
      { day: "fri", revenue: 0 },
      { day: "sat", revenue: 0 },
    ];

    const defaultMonthlyData = [
      { month: "jan", revenue: 0 },
      { month: "feb", revenue: 0 },
      { month: "mar", revenue: 0 },
      { month: "apr", revenue: 0 },
      { month: "may", revenue: 0 },
      { month: "jun", revenue: 0 },
      { month: "jul", revenue: 0 },
      { month: "aug", revenue: 0 },
      { month: "sep", revenue: 0 },
      { month: "oct", revenue: 0 },
      { month: "nov", revenue: 0 },
      { month: "dec", revenue: 0 },
    ];

    // Select the appropriate default data based on the period
    const defaultData = period === "weekly" ? defaultWeeklyData : defaultMonthlyData;

    // Map the data, using the default structure in case of missing data
    return defaultData.map((defaultItem) => {
      const match = period === "weekly"
        ? data.find((item) => item.day === defaultItem.day)
        : data.find((item) => item.month === defaultItem.month);
      return match ? match.revenue : defaultItem.revenue;
    });
  };

  useEffect(() => {
    // Log the data for debugging
    console.log("Subscriber Data: ", subscriberData);
    console.log("Guide Data: ", guideData);
    console.log("Time Period: ", timePeriod);

    // Choose the correct categories for the x-axis based on time period
    const categories = timePeriod === "monthly" ? monthlyCategories : weeklyCategories;

    // Map the data to guide and subscriber series
    const mappedGuideData = mapDataToPeriod(guideData, timePeriod);
    const mappedSubscriberData = mapDataToPeriod(subscriberData, timePeriod);

    // Log mapped data for debugging
    console.log("Mapped Guide Data: ", mappedGuideData);
    console.log("Mapped Subscriber Data: ", mappedSubscriberData);

    // Ensure valid categories and mapped data
    if (!categories || categories.length === 0) {
      console.error("Invalid categories for x-axis!");
      return;
    }

    if (!Array.isArray(mappedGuideData) || !Array.isArray(mappedSubscriberData)) {
      console.error("Invalid data format passed to the chart!");
      return;
    }

    // Update the chart data with new categories and series
    setData((prevData) => ({
      ...prevData,
      options: {
        ...prevData.options,
        xaxis: {
          ...prevData.options.xaxis,
          categories, // Set categories based on time period
        },
      },
      series: [
        {
          name: "Guides",
          data: mappedGuideData, // Map guide data correctly
        },
        {
          name: "Subscribers",
          data: mappedSubscriberData, // Map subscriber data correctly
        },
      ],
    }));
  }, [subscriberData, guideData, timePeriod]);

  return (
    <div className="w-full bg-white rounded-xl p-3">
      <Chart options={data.options} series={data.series} type="line" width="98%" height="300px" />
    </div>
  );
}
