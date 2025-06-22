import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../css/Chart.css';

const Adminview = () => {
  
  const userContributions = [
    { user: 'User A', weight: 33 },
    { user: 'User B', weight: 38 },
    { user: 'User C', weight: 31 },
    { user: 'User D', weight: 25 },
    { user: 'User E', weight: 55 },
    { user: 'User F', weight: 42 },
  ];

  const processedData = userContributions.reduce((pre, cur) => {
    if (pre[cur.user]) {
      pre[cur.user] += cur.weight;
    } else {
      pre[cur.user] = cur.weight;
    }
    return pre;
  }, {});

  const chartData = {
    labels: Object.keys(processedData),
    datasets: [
      {
        label: 'Plastic Recycled (kg)',
        data: Object.values(processedData),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Weight (kg)',
          font: {
            size: 14,
            weight: 'bold',
            color: '#333333',
          },
        },
        ticks: {
          color: '#2c3e50',
          font: {
            size: 12,
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'User',
          font: {
            size: 14,
            weight: 'bold',
            color: '#333333',
          },
        },
        ticks: {
          color: '#333333',
          font: {
            size: 14,
            family: 'Arial',
            weight: '500',
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div className="user-contribution-container">
      <h2 className="admin-contribution-title">Users Contributions in Plastic Recycling</h2>
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Adminview;
