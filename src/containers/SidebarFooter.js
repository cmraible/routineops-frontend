import { Nav } from 'grommet';
import { Logout, SettingsOption, Actions } from 'grommet-icons';
import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth.actions';
import {
  goToSettings,
  toggleDarkMode
} from '../actions/ui.actions';
import SidebarButton from '../components/SidebarButton';
import { getLoggedInUser } from '../reducers/reducers';

const SidebarFooter = ({logout, user, toggleDarkMode, darkMode, afterClick }) => {

  const handleClick = (callback) => {
    callback();
    if (afterClick) {
      afterClick();
    }
  }

  return (
        <Nav gap="small">
          <SidebarButton icon={<Actions />} label="Dark Mode" onClick={ () => handleClick(toggleDarkMode)} />
          {
            (user.is_org_admin && 
              <SidebarButton icon={<SettingsOption />} label="Settings" onClick={() => handleClick(goToSettings)} />
            )
          }
          <SidebarButton 
            icon={<Logout />} 
            label="Logout" 
            onClick={ () => {
              window.Intercom('shutdown');
              handleClick(logout);
            }}
          />
        </Nav>
  )
};

const mapStateToProps = state => ({
  user: getLoggedInUser(state),
  pathname: state.router.location.pathname,
  darkMode: state.ui.darkMode
});

export default connect(mapStateToProps, {
  goToSettings,
  logout,
  toggleDarkMode
})(SidebarFooter);
