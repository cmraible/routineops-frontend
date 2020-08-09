import { Nav } from 'grommet';
import { Calendar, Checkmark, Dashboard, Group, Task, User } from 'grommet-icons';
import React from 'react';
import { connect } from 'react-redux';
import {
  goToCalendar,
  goToDashboard, 
  goToHome,
  goToRoles,
  goToTasks,
  goToUsers
} from '../actions/ui.actions';
import SidebarButton from '../components/SidebarButton';
import { getLoggedInUser } from '../reducers/reducers';

const SidebarNav = ({goToTasks, goToCalendar, goToUsers, goToDashboard, goToRoles, goToHome, pathname, user, afterClick }) => {

  const handleClick = (callback) => {
    callback();
    if (afterClick) {
      afterClick();
    }
  }

  return (
        <Nav gap="small">
          <SidebarButton icon={<Task />} active={(pathname === '/')} label="My Tasks" onClick={() => handleClick(goToHome) } /> 
          {
            (user.is_org_admin && 
              <SidebarButton icon={<User />} label="Users" onClick={() => handleClick(goToUsers) } />
            )
          }
          <SidebarButton icon={<Group />} active={(pathname === '/roles')} label="Roles" onClick={() => handleClick(goToRoles) } />
          <SidebarButton label="Tasks" icon={<Checkmark />} active={(pathname === '/tasks')} onClick={() => handleClick(goToTasks) } /> 
          <SidebarButton label="Calendar" icon={<Calendar />} active={(pathname === '/calendar')} onClick={() => handleClick(goToCalendar)} />
          <SidebarButton label="Dashboard" icon={<Dashboard />} active={(pathname === '/dashboard')} onClick={() => handleClick(goToDashboard)} />
        </Nav>
  )
};

const mapStateToProps = state => ({
  user: getLoggedInUser(state),
  pathname: state.router.location.pathname
});

export default connect(mapStateToProps, {
  goToTasks,
  goToCalendar,
  goToHome,
  goToUsers,
  goToDashboard,
  goToRoles
})(SidebarNav);
