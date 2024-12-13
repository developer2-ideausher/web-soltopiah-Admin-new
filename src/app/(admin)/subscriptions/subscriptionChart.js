import dynamic from "next/dynamic";
import React from "react";
import PropTypes from "prop-types";

// Dynamically import the chart component (ApexCharts) without SSR
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SubsLineChart = ({ chartData, filter }) => {
  // Ensure chartData is available
  if (!chartData || chartData.length === 0) {
    return <p>No data available.</p>;
  }

  // Map the monthly data
  const monthlyData = chartData.map(item => item.revenueFromMonthlySubscriptionPlans);
  const yearlyMonthlyData = chartData.map(item => item.revenueFromYearlySubscriptionPlans);

  // Map the weekly data if the filter is "weekly"
  const weeklyData = chartData.map(item => item.revenueFromMonthlySubscriptionPlans);
  const yearlyWeeklyData = chartData.map(item => item.revenueFromYearlySubscriptionPlans);

  // Choose data based on the filter (weekly or monthly)
  const chartSeries = [
    {
      name: "Monthly Subscription Revenue",
      data: filter === "weekly" ? weeklyData : monthlyData || [10, 5, 100, 20, 50, 10, 10, 30, 20, 90, 10, 0],  // Fallback for monthly data
    },
    {
      name: "Yearly Subscription Revenue",
      data: filter === "weekly" ? yearlyWeeklyData : yearlyMonthlyData || [0, 0, 300, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // Fallback for yearly data
    },
  ];

  // Configure chart options
  const chartOptions = {
    chart: {
      type: "line",  // Type of chart (line chart)
      height: 350,   // Height of the chart
      toolbar: {
        show: false, // Disable toolbar
      },
    },
    dataLabels: {
      enabled: false,  // Disable data labels on the chart
    },
    stroke: {
      width: 2,        // Line width
      curve: "smooth", // Smooth curve for the line chart
    },
    xaxis: {
      categories: filter === "weekly"
        ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]  // Days of the week for weekly filter
        : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],  // Months for monthly filter
    },
    colors: ["#008FFB", "#00E396"], // Colors for the two lines (monthly and yearly)
    grid: {
      borderColor: "#e7e7e7",  // Grid line color
    },
    legend: {
      position: "bottom", // Position of the legend
      horizontalAlign: "center", // Horizontal alignment for the legend
    },
  };

  return (
    <div>
      <Chart options={chartOptions} series={chartSeries} type="line" height={350} width="100%" />
    </div>
  );
};

// Prop validation for better debugging (optional)
// SubsLineChart.propTypes = {
//   chartData: PropTypes.arrayOf(
//     PropTypes.shape({
//       day: PropTypes.string, // For weekly data
//       month: PropTypes.string, // For monthly data
//       revenueFromMonthlySubscriptionPlans: PropTypes.number.isRequired,
//       revenueFromYearlySubscriptionPlans: PropTypes.number.isRequired,
//     })
//   ).isRequired,
//   filter: PropTypes.oneOf(["weekly", "monthly"]).isRequired,  // filter prop to determine which data to show
// };

export default SubsLineChart;
