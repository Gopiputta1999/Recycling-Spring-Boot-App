import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import "../css/Chart.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart() {
  const data = {
    labels: ['Preston', 'Manchester', 'Blackpool', 'Southport', 'Liverpool', 'Blackburn','Burnley'],
    datasets: [
      {
        label: 'Plastic Usage across Cities (%)',
        data: [35, 65, 50, 60, 55,25,32], 
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
    ],
  };
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Plastic Usage percentage in different cities',
        font: {
          size: 25,
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  useEffect(() => {
    return () => {
      if (window.Chart && window.Chart.instances) {
        window.Chart.instances.forEach(chartInstance => {
          chartInstance.destroy();
        });
      }
    };
  }, []);

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart;
