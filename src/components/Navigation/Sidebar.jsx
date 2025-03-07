import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FiHome, 
  FiUsers, 
  FiPackage, 
  FiShoppingCart, 
  FiDollarSign, 
  FiPieChart, 
  FiSettings,
  FiMenu,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

const SidebarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: ${props => props.isCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)'};
  background-color: var(--primary-color);
  color: white;
  transition: width var(--transition-speed);
  z-index: 100;
  overflow-x: hidden;

  @media (max-width: 768px) {
    width: ${props => props.isOpen ? 'var(--sidebar-width)' : '0'};
    box-shadow: ${props => props.isOpen ? '0 0 10px rgba(0,0,0,0.2)' : 'none'};
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => props.isCollapsed ? 'center' : 'space-between'};
  padding: ${props => props.isCollapsed ? '20px 0' : '20px'};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled.div`
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: ${props => props.isCollapsed ? 'none' : 'block'};

  @media (max-width: 768px) {
    display: block;
  }
`;

const CollapseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 4px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuItems = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  margin: 0;
  padding: 0;
`;

const MenuLink = styled.a`
  display: flex;
  align-items: center;
  padding: ${props => props.isCollapsed ? '15px 0' : '15px 20px'};
  justify-content: ${props => props.isCollapsed ? 'center' : 'flex-start'};
  color: white;
  text-decoration: none;
  transition: all 0.3s;
  position: relative;
  
  ${props => props.isActive && `
    background-color: rgba(26, 187, 156, 0.2);
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 4px;
      background-color: var(--accent-color);
    }
  `}

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const MenuIcon = styled.span`
  margin-right: ${props => props.isCollapsed ? '0' : '12px'};
  font-size: 1.2rem;
  display: flex;
  align-items: center;
`;

const MenuText = styled.span`
  white-space: nowrap;
  display: ${props => props.isCollapsed ? 'none' : 'inline'};

  @media (max-width: 768px) {
    display: inline;
  }
`;

const MobileMenuButton = styled.button`
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 200;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const menuData = [
  { id: 1, name: 'Dashboard', icon: <FiHome />, active: true },
  { id: 2, name: 'CRM', icon: <FiUsers /> },
  { id: 3, name: 'Inventory Management', icon: <FiPackage /> },
  { id: 4, name: 'Sales Management', icon: <FiShoppingCart /> },
  { id: 5, name: 'Expense Tracking', icon: <FiDollarSign /> },
  { id: 6, name: 'Financial Reports', icon: <FiPieChart /> },
  { id: 7, name: 'Settings', icon: <FiSettings /> },
];

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMenuItemClick = (id) => {
    setActiveItem(id);
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {isMobile && (
        <MobileMenuButton onClick={toggleMobileMenu}>
          <FiMenu size={24} />
        </MobileMenuButton>
      )}
      
      <SidebarContainer 
        isCollapsed={isCollapsed && !isMobile} 
        isOpen={isMobile ? isMobileOpen : true}
      >
        <SidebarHeader isCollapsed={isCollapsed && !isMobile}>
          <Logo isCollapsed={isCollapsed && !isMobile}>Accounting App</Logo>
          <CollapseButton onClick={toggleSidebar}>
            {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </CollapseButton>
        </SidebarHeader>
        
        <MenuItems>
          {menuData.map((item) => (
            <MenuItem key={item.id}>
              <MenuLink 
                href="#" 
                isCollapsed={isCollapsed && !isMobile}
                isActive={activeItem === item.id}
                onClick={() => handleMenuItemClick(item.id)}
              >
                <MenuIcon isCollapsed={isCollapsed && !isMobile}>
                  {item.icon}
                </MenuIcon>
                <MenuText isCollapsed={isCollapsed && !isMobile}>
                  {item.name}
                </MenuText>
              </MenuLink>
            </MenuItem>
          ))}
        </MenuItems>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
