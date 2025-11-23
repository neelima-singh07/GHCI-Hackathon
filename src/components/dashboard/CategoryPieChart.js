import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = ({ data }) => {
  const mockData = data.length > 0 ? data : [
    { category: 'Food & Dining', amount: 4200, color: '#ef4444' },
    { category: 'Transportation', amount: 2800, color: '#f59e0b' },
    { category: 'Shopping', amount: 3100, color: '#8b5cf6' },
    { category: 'Entertainment', amount: 1500, color: '#06b6d4' },
    { category: 'Bills & Utilities', amount: 2200, color: '#10b981' },
    { category: 'Others', amount: 1650, color: '#6b7280' }
  ];

  const chartData = {
    labels: mockData.map(item => item.category),
    datasets: [
      {
        data: mockData.map(item => item.amount),
        backgroundColor: mockData.map(item => item.color),
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverOffset: 10
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 15,
          font: {
            size: 12
          },
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const value = data.datasets[0].data[i];
                const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return {
                  text: `${label} (${percentage}%)`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  hidden: false,
                  index: i
                };
              });
            }
            return [];
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed;
            return `${label}: ₹${value.toLocaleString()}`;
          }
        }
      }
    }
  };

  return (
    <div className="card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Category Breakdown</h3>
        <p className="text-sm text-gray-600">Spending distribution by category</p>
      </div>
      <div className="h-64">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CategoryPieChart;
