import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import '../css/Chart.css';

const UserContribution = () => {
  
  const dummyContributions = [
    { date: '2024-01-10', weight: 12 },
    { date: '2024-02-15', weight: 8 },
    { date: '2024-02-20', weight: 50 },
    { date: '2024-03-05', weight: 23 },
    { date: '2024-04-18', weight: 11 },
    { date: '2024-05-10', weight: 35 },
    { date: '2024-06-12', weight: 28 },
    { date: '2024-07-21', weight: 19 },
    { date: '2024-08-30', weight: 20 },
    { date: '2024-09-15', weight: 17 },
    { date: '2024-10-01', weight: 21 },
    { date: '2024-11-06', weight: 15 },
  ];

  const processedData = dummyContributions.reduce((pre, cur) => {
    const date = new Date(cur.date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    if (pre[date]) {
      pre[date] += cur.weight;
    } else {
      pre[date] = cur.weight;
    }
    return pre;
  }, {});

  const chartData = {
    labels: Object.keys(processedData),
    datasets: [
      {
        label: 'Plastic Recycled (kg)',
        data: Object.values(processedData),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
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
            color: '#333333' 
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
          text: 'Month',
          font: {
            size: 14,
            weight: 'bold',
            color: '#333333' 
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
      <h2 className="user-contribution-title">Your Contributions</h2>
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default UserContribution;
