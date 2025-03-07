import React, { useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const DatePickerContainer = styled.div`
  position: relative;
`;

const DateDisplay = styled.button`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 12px;
  font-family: 'Open Sans', sans-serif;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: var(--accent-color);
  }
`;

const CalendarIcon = styled.span`
  margin-right: 8px;
`;

const DatePickerDropdown = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  width: 300px;
  margin-top: 5px;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const DateRangeOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DateRangeOption = styled.button`
  background-color: ${props => props.isSelected ? 'var(--accent-color)' : 'transparent'};
  color: ${props => props.isSelected ? 'white' : 'var(--text-color)'};
  border: 1px solid ${props => props.isSelected ? 'var(--accent-color)' : '#ddd'};
  border-radius: 4px;
  padding: 8px 12px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.isSelected ? 'var(--accent-color)' : '#f5f5f5'};
  }
`;

const CustomDateContainer = styled.div`
  margin-top: 10px;
  border-top: 1px solid #ddd;
  padding-top: 10px;
`;

const CustomDateInputs = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const DateInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ApplyButton = styled.button`
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  margin-top: 10px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #16a085;
  }
`;

const DateRangePicker = ({ dateRange, onDateRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('last30Days');
  const [customRange, setCustomRange] = useState({
    startDate: format(dateRange.startDate, 'yyyy-MM-dd'),
    endDate: format(dateRange.endDate, 'yyyy-MM-dd')
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    
    let newStartDate, newEndDate;
    const today = new Date();
    
    switch (option) {
      case 'today':
        newStartDate = today;
        newEndDate = today;
        break;
      case 'yesterday':
        newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() - 1);
        newEndDate = new Date(today);
        newEndDate.setDate(today.getDate() - 1);
        break;
      case 'last7Days':
        newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() - 6);
        newEndDate = today;
        break;
      case 'last30Days':
        newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() - 29);
        newEndDate = today;
        break;
      case 'thisMonth':
        newStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
        newEndDate = today;
        break;
      case 'lastMonth':
        newStartDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        newEndDate = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      default:
        return;
    }
    
    setCustomRange({
      startDate: format(newStartDate, 'yyyy-MM-dd'),
      endDate: format(newEndDate, 'yyyy-MM-dd')
    });
    
    onDateRangeChange({
      startDate: newStartDate,
      endDate: newEndDate
    });
    
    setIsOpen(false);
  };

  const handleCustomDateChange = (e, field) => {
    setCustomRange({
      ...customRange,
      [field]: e.target.value
    });
  };

  const applyCustomRange = () => {
    onDateRangeChange({
      startDate: new Date(customRange.startDate),
      endDate: new Date(customRange.endDate)
    });
    setIsOpen(false);
  };

  const formatDisplayDate = () => {
    return `${format(dateRange.startDate, 'MMM d, yyyy')} - ${format(dateRange.endDate, 'MMM d, yyyy')}`;
  };

  return (
    <DatePickerContainer>
      <DateDisplay onClick={toggleDropdown}>
        <CalendarIcon>📅</CalendarIcon>
        {formatDisplayDate()}
      </DateDisplay>
      
      <DatePickerDropdown isOpen={isOpen}>
        <DateRangeOptions>
          <DateRangeOption 
            isSelected={selectedOption === 'today'}
            onClick={() => handleOptionClick('today')}
          >
            Today
          </DateRangeOption>
          <DateRangeOption 
            isSelected={selectedOption === 'yesterday'}
            onClick={() => handleOptionClick('yesterday')}
          >
            Yesterday
          </DateRangeOption>
          <DateRangeOption 
            isSelected={selectedOption === 'last7Days'}
            onClick={() => handleOptionClick('last7Days')}
          >
            Last 7 Days
          </DateRangeOption>
          <DateRangeOption 
            isSelected={selectedOption === 'last30Days'}
            onClick={() => handleOptionClick('last30Days')}
          >
            Last 30 Days
          </DateRangeOption>
          <DateRangeOption 
            isSelected={selectedOption === 'thisMonth'}
            onClick={() => handleOptionClick('thisMonth')}
          >
            This Month
          </DateRangeOption>
          <DateRangeOption 
            isSelected={selectedOption === 'lastMonth'}
            onClick={() => handleOptionClick('lastMonth')}
          >
            Last Month
          </DateRangeOption>
        </DateRangeOptions>
        
        <CustomDateContainer>
          <DateRangeOption 
            isSelected={selectedOption === 'custom'}
            onClick={() => setSelectedOption('custom')}
          >
            Custom Range
          </DateRangeOption>
          
          {selectedOption === 'custom' && (
            <>
              <CustomDateInputs>
                <DateInput 
                  type="date" 
                  value={customRange.startDate}
                  onChange={(e) => handleCustomDateChange(e, 'startDate')}
                />
                <DateInput 
                  type="date" 
                  value={customRange.endDate}
                  onChange={(e) => handleCustomDateChange(e, 'endDate')}
                />
              </CustomDateInputs>
              <ApplyButton onClick={applyCustomRange}>Apply</ApplyButton>
            </>
          )}
        </CustomDateContainer>
      </DatePickerDropdown>
    </DatePickerContainer>
  );
};

export default DateRangePicker;
