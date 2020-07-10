import { Nav } from 'grommet';
import { Calendar, Checkmark, Dashboard, Group, Home } from 'grommet-icons';
import React from 'react';
import { connect } from 'react-redux';
import {
  goToCalendar,
  goToDashboard, 
  goToHome,
  goToRoles,
  goToTasks
} from '../actions/ui.actions';
import SidebarButton from './SidebarButton';

const SidebarNav = ({goToTasks, goToCalendar, goToHome, pathname }) => {

  return (
        <Nav gap="small">
          <SidebarButton icon={<Home />} active={(pathname === '/')} label="Home" onClick={() => goToHome() } /> 
          <SidebarButton icon={<Group />} active={(pathname === '/roles')} label="Roles" onClick={() => goToRoles() } />
          <SidebarButton label="Tasks" icon={<Checkmark />} active={(pathname === '/tasks')} onClick={() => goToTasks() } /> 
          <SidebarButton label="Calendar" icon={<Calendar />} active={(pathname === '/calendar')} onClick={() => goToCalendar()} />
          <SidebarButton label="Dashboard" icon={<Dashboard />} active={(pathname === '/dashboard')} onClick={() => goToDashboard()} />
        </Nav>
  )
};

const mapStateToProps = state => ({
  pathname: state.router.location.pathname
});

export default connect(mapStateToProps, {
  goToTasks,
  goToCalendar,
  goToHome
})(SidebarNav);
