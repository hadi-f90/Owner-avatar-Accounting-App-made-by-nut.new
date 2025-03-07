import React, { useState } from 'react';
import Sidebar from './components/Navigation/Sidebar';
import Dashboard from './pages/Dashboard';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  margin-left: ${props => props.sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)'};
  transition: margin-left var(--transition-speed);
  overflow-y: auto;
  background-color: var(--background-color);

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <AppContainer>
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        toggleSidebar={toggleSidebar} 
      />
      <MainContent sidebarCollapsed={isSidebarCollapsed}>
        <Dashboard />
      </MainContent>
    </AppContainer>
  );
}

export default App;
