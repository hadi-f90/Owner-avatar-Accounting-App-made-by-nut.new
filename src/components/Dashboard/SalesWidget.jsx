import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { format, eachDayOfInterval, parseISO } from 'date-fns';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

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

const TotalAmount = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--primary-color);
`;

const ChartContainer = styled.div`
  height: 250px;
  position: relative;
`;

// Mock data generator
const generateSalesData = (startDate, endDate) => {
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  return days.map(day => ({
    date: format(day, 'yyyy-MM-dd'),
    sales: Math.floor(Math.random() * 5000) + 1000
  }));
};

const SalesWidget = ({ dateRange }) => {
  const [salesData, setSalesData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    // In a real app, this would be an API call
    const data = generateSalesData(dateRange.startDate, dateRange.endDate);
    setSalesData(data);
    
    // Calculate total sales
    const total = data.reduce((sum, day) => sum + day.sales, 0);
    setTotalSales(total);
  }, [dateRange]);

  const chartData = {
    labels: salesData.map(day => format(parseISO(day.date), 'MMM d')),
    datasets: [
      {
        label: 'Sales',
        data: salesData.map(day => day.sales),
        borderColor: 'var(--accent-color)',
        backgroundColor: 'rgba(26, 187, 156, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 2,
        pointHoverRadius: 5,
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
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return `Sales: $${context.raw.toLocaleString()}`;
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
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <WidgetContainer>
      <WidgetHeader>
        <WidgetTitle>Total Sales</WidgetTitle>
        <TotalAmount>${totalSales.toLocaleString()}</TotalAmount>
      </WidgetHeader>
      <ChartContainer>
        <Line data={chartData} options={chartOptions} />
      </ChartContainer>
    </WidgetContainer>
  );
};

export default SalesWidget;
