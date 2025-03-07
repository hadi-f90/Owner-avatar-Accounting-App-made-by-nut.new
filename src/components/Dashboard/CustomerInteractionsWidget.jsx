
import React from 'react';
import styled from 'styled-components';
import { format, formatDistanceToNow } from 'date-fns';

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

const InteractionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 350px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 3px;
  }
`;

const InteractionItem = styled.li`
  padding: 12px 0;
  display: flex;
  border-bottom: 1px solid #f5f5f5;
  
  &:last-child {
    border-bottom: none;
  }
`;

const InteractionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => {
    switch (props.type) {
      case 'email': return '#bbdefb';
      case 'call': return '#d1c4e9';
      case 'meeting': return '#c8e6c9';
      case 'note': return '#ffecb3';
      default: return '#e0e0e0';
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  flex-shrink: 0;
  color: ${props => {
    switch (props.type) {
      case 'email': return '#1565c0';
      case 'call': return '#5e35b1';
      case 'meeting': return '#2e7d32';
      case 'note': return '#f57c00';
      default: return '#757575';
    }
  }};
  font-size: 1.2rem;
`;

const InteractionContent = styled.div`
  flex: 1;
`;

const InteractionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const CustomerName = styled.span`
  font-weight: 600;
  color: var(--text-color);
`;

const InteractionTime = styled.span`
  font-size: 0.8rem;
  color: #757575;
`;

const InteractionType = styled.div`
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 5px;
  color: ${props => {
    switch (props.type) {
      case 'email': return '#1565c0';
      case 'call': return '#5e35b1';
      case 'meeting': return '#2e7d32';
      case 'note': return '#f57c00';
      default: return '#757575';
    }
  }};
`;

const InteractionDescription = styled.p`
  margin: 0;
  color: var(--text-color);
  font-size: 0.9rem;
`;

const getIcon = (type) => {
  switch (type) {
    case 'email': return '✉️';
    case 'call': return '📞';
    case 'meeting': return '🤝';
    case 'note': return '📝';
    default: return '📋';
  }
};

// Mock interaction data
const interactionData = [
  {
    id: 1,
    customer: 'Acme Corp',
    type: 'email',
    description: 'Sent follow-up email regarding Q2 invoice payment.',
    timestamp: new Date(2023, 5, 10, 14, 30)
  },
  {
    id: 2,
    customer: 'Globex',
    type: 'call',
    description: 'Discussed upcoming order requirements and potential volume discount.',
    timestamp: new Date(2023, 5, 10, 11, 15)
  },
  {
    id: 3,
    customer: 'Wayne Enterprises',
    type: 'meeting',
    description: 'Quarterly review meeting with procurement team.',
    timestamp: new Date(2023, 5, 9, 10, 0)
  },
  {
    id: 4,
    customer: 'Stark Industries',
    type: 'note',
    description: 'Customer requested updated catalog with new pricing.',
    timestamp: new Date(2023, 5, 8, 16, 45)
  },
  {
    id: 5,
    customer: 'Umbrella Corp',
    type: 'email',
    description: 'Sent promotional offer for new product line.',
    timestamp: new Date(2023, 5, 8, 9, 30)
  },
  {
    id: 6,
    customer: 'Cyberdyne Systems',
    type: 'call',
    description: 'Resolved billing dispute regarding shipping charges.',
    timestamp: new Date(2023, 5, 7, 13, 20)
  }
];

const CustomerInteractionsWidget = () => {
  return (
    <WidgetContainer>
      <WidgetHeader>
        <WidgetTitle>Recent Customer Interactions</WidgetTitle>
      </WidgetHeader>