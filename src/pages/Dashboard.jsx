import React, { useState } from 'react';
import styled from 'styled-components';
import DateRangePicker from '../components/Dashboard/DateRangePicker';
import SalesWidget from '../components/Dashboard/SalesWidget';
import InventoryWidget from '../components/Dashboard/InventoryWidget';
import InvoicesWidget from '../components/Dashboard/InvoicesWidget';
import CustomerInteractionsWidget from '../components/Dashboard/CustomerInteractionsWidget';

const DashboardContainer = styled.div`
  padding: 0 0 20px 0;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const DashboardTitle = styled.h1`
  font-family: 'Roboto', sans-serif;
  color: var(--text-color);
  margin: 0;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Dashboard = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    endDate: new Date()
  });

  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange);
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <DashboardTitle>Dashboard</DashboardTitle>
        <DateRangePicker 
          dateRange={dateRange} 
          onDateRangeChange={handleDateRangeChange} 
        />
      </DashboardHeader>
      
      <DashboardGrid>
        <SalesWidget dateRange={dateRange} />
        <InventoryWidget />
        <InvoicesWidget />
        <CustomerInteractionsWidget />
      </DashboardGrid>
    </DashboardContainer>
  );
};

export default Dashboard;
