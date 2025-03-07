import React from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WidgetContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 100%;
`;

const WidgetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const WidgetTitle = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  margin: 0;
  color: var(--text-color);
`;

const LowStockIndicator = styled.div`
  background-color: #ffebee;
  color: #e53935;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ChartContainer = styled.div`
  height: 250px;
  position: relative;
`;

// Mock inventory data
const inventoryData = [
  { name: 'Product A', stock: 150, threshold: 20 },
  { name: 'Product B', stock: 75, threshold: 50 },
  { name: 'Product C', stock: 18, threshold: 25 },
  { name: 'Product D', stock: 200, threshold: 30 },
  { name: 'Product E', stock: 42, threshold: 40 },
  { name: 'Product F', stock: 12, threshold: 30 }
];

const InventoryWidget = () => {
  const lowStockItems = inventoryData.filter(item => item.stock <= item.threshold);
  
  const chartData = {
    labels: inventoryData.map(item => item.name),
    datasets: [
      {
        label: 'Current Stock',
        data: inventoryData.map(item => item.stock),
        backgroundColor: inventoryData.map(item => 
          item.stock <= item.threshold ? '#e53935' : 'var(--accent-color)'
        ),
        borderRadius: 4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const item = inventoryData[context.dataIndex];
            return [
              `Stock: ${item.stock} units`,
              `Threshold: ${item.threshold} units`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Units in Stock'
        }
      }
    }
  };

  return (
    <WidgetContainer>
      <WidgetHeader>
        <WidgetTitle>Current Inventory Levels</WidgetTitle>
        {lowStockItems.length > 0 && (
          <LowStockIndicator>
            {lowStockItems.length} items low in stock
          </LowStockIndicator>
        )}
      </WidgetHeader>
      <ChartContainer>
        <Bar data={chartData} options={chartOptions} />
      </ChartContainer>
    </WidgetContainer>
  );
};

export default InventoryWidget;
