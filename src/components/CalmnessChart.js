// components/LineChart.js
import React from 'react';
import Chart from 'react-apexcharts';

const LineChart = () => {
  const options = {
    chart: {
      id: 'basic-line-chart',
      toolbar: {
        show: false // Disable the toolbar
      }
    },
    xaxis: {
      categories: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    }
  };

  const series = [
    {
      name: 'Calmness',
      data: [0,2,1,4,5]
    }
  ];

  return (
    <div>
      <Chart options={options} series={series} type="line" width="500" />
    </div>
  );
};

export default LineChart;
