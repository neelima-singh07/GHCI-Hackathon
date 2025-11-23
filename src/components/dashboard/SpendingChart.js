import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SpendingChart = ({ data }) => {
  const mockData = data.length > 0 ? data : [
    { date: '2024-01-01', amount: 1200 },
    { date: '2024-01-05', amount: 1800 },
    { date: '2024-01-10', amount: 1500 },
    { date: '2024-01-15', amount: 2200 },
    { date: '2024-01-20', amount: 1900 },
    { date: '2024-01-25', amount: 2400 },
    { date: '2024-01-30', amount: 2100 }
  ];

  const chartData = {
    labels: mockData.map(item => new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    datasets: [
      {
        label: 'Daily Spending',
        data: mockData.map(item => item.amount),
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(14, 165, 233)',
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          label: (context) => `₹${context.parsed.y.toLocaleString()}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₹${value}`
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Spending Trend</h3>
        <p className="text-sm text-gray-600">Your daily spending over the last 30 days</p>
      </div>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SpendingChart;
