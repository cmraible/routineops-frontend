import { Sidebar } from 'grommet';
import React from 'react';
import UserMenu from './UserMenu';
import SidebarNav from './SidebarNav';
import SidebarFooter from './SidebarFooter';

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
