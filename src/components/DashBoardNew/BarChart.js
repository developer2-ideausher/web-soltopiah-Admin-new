import dynamic from "next/dynamic";
import React from "react";
import PropTypes from "prop-types";

// Use dynamic import to prevent SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const BarChart = ({ guide = 0, revenue = 0, subscription = 0 }) => {
  // Log values outside the render logic
  console.log("Guide Revenue:", guide);
  // console.log("Donation Revenue:", revenue);
  console.log("Subscription Revenue:", subscription);

  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Guide Revenue", "Subscription Revenue"],
    },
    colors: ["#008FFB",  "#FEB019"], // Colors for the bars
  };

  const chartSeries = [
    {
      name: "Revenue",
      data: [guide,  subscription], // Values for each bar
    },
  ];

  return (
    <div>
      <Chart options={chartOptions} series={chartSeries} type="bar" height={350} width="100%" />
    </div>
  );
};

// Prop validation for better debugging
BarChart.propTypes = {
  guide: PropTypes.number,
  revenue: PropTypes.number,
  subscription: PropTypes.number,
};

export default BarChart;
