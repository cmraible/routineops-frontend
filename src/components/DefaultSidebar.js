import { Sidebar } from 'grommet';
import React from 'react';
import SidebarFooter from './SidebarFooter';
import SidebarNav from './SidebarNav';
import UserMenu from './UserMenu';

const DefaultSidebar = () => {
  
  return (
      <Sidebar 
        align="center" 
        background="black" 
        pad="medium" 
        justify="between"
        header={<UserMenu />}
        footer={<SidebarFooter />}
      >        
        <SidebarNav />
      </Sidebar>
  )
};

export default DefaultSidebar;
