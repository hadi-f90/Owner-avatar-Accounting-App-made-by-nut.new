import React from 'react';
import styled from 'styled-components';
import { format, isAfter } from 'date-fns';

const WidgetContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 100%;
  overflow: hidden;
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
  font-weight: 500;
  color: var(--text-color);
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const InvoiceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  border-bottom: 1px solid #eee;
`;

const TableHeaderCell = styled.th`
  text-align: left;
  padding: 10px 5px;
  font-weight: 600;
  color: var(--text-color);
  font-size: 0.9rem;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid #f5f5f5;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 10px 5px;
  color: var(--text-color);
  font-size: 0.9rem;
`;

const StatusCell = styled(TableCell)`
  color: ${props => props.isOverdue ? '#e53935' : '#fb8c00'};
  font-weight: 500;
`;

const PayButton = styled.button`
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #16a085;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 30px 0;
  color: #999;
`;

// Mock invoice data
const invoiceData = [
  { id: 'INV-001', customer: 'Acme Corp', dueDate: '2023-06-15', amount: 1250.75 },
  { id: 'INV-002', customer: 'Globex', dueDate: '2023-06-20', amount: 2340.50 },
  { id: 'INV-003', customer: 'Wayne Enterprises', dueDate: '2023-06-10', amount: 4500.00 },
  { id: 'INV-004', customer: 'Stark Industries', dueDate: '2023-06-05', amount: 1800.25 },
  { id: 'INV-005', customer: 'Umbrella Corp', dueDate: '2023-06-25', amount: 3200.00 }
];

const InvoicesWidget = () => {
  const totalOutstanding = invoiceData.reduce((sum, invoice) => sum + invoice.amount, 0);
  const today = new Date();

  const handlePayNow = (invoiceId) => {
    alert(`Processing payment for invoice ${invoiceId}`);
    // In a real app, this would open a payment modal or redirect to a payment page
  };

  return (
    <WidgetContainer>
      <WidgetHeader>
        <WidgetTitle>Outstanding Invoices</WidgetTitle>
        <TotalAmount>Total: ${totalOutstanding.toLocaleString()}</TotalAmount>
      </WidgetHeader>
      
      {invoiceData.length > 0 ? (
        <TableWrapper>
          <InvoiceTable>
            <TableHeader>
              <tr>
                <TableHeaderCell>Invoice #</TableHeaderCell>
                <TableHeaderCell>Customer</TableHeaderCell>
                <TableHeaderCell>Due Date</TableHeaderCell>
                <TableHeaderCell>Amount</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Action</TableHeaderCell>
              </tr>
            </TableHeader>
            <TableBody>
              {invoiceData.map((invoice) => {
                const dueDate = new Date(invoice.dueDate);
                const isOverdue = isAfter(today, dueDate);
                
                return (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>{invoice.customer}</TableCell>
                    <TableCell>{format(dueDate, 'MMM d, yyyy')}</TableCell>
                    <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                    <StatusCell isOverdue={isOverdue}>
                      {isOverdue ? 'Overdue' : 'Pending'}
                    </StatusCell>
                    <TableCell>
                      <PayButton onClick={() => handlePayNow(invoice.id)}>
                        Pay Now
                      </PayButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </InvoiceTable>
        </TableWrapper>
      ) : (
        <EmptyState>No outstanding invoices</EmptyState>
      )}
    </WidgetContainer>
  );
};

export default InvoicesWidget;
