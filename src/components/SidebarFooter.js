import { Box, CheckBox, Footer, Nav, Text } from 'grommet';
import { Logout, SettingsOption } from 'grommet-icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth.actions';
import {
  goToSettings,
  toggleDarkMode
} from '../actions/ui.actions';
import SidebarButton from './SidebarButton';

const SidebarFooter = ({logout, user, toggleDarkMode, darkMode }) => {

  const [checked, setChecked] = useState(darkMode)
  const onChange = event => {
    toggleDarkMode()
    return setChecked(event.target.checked);
  };


  return (
      <Footer> 
        <Nav gap="small">
          <Box direction="row" justify="between" papd="small">
            <CheckBox toggle checked={checked} onChange={onChange} />
            <Text>Dark Mode</Text>
          </Box>
          {
            (user.is_org_admin && 
              <SidebarButton icon={<SettingsOption />} label="Settings" onClick={() => goToSettings() } />
            )
          }
          <SidebarButton icon={<Logout />} label="Logout" onClick={() => logout() } />
        </Nav>
      </Footer>
  )
};

const mapStateToProps = state => ({
  user: state.user.user,
  pathname: state.router.location.pathname,
  darkMode: state.ui.darkMode
});

export default connect(mapStateToProps, {
  goToSettings,
  logout,
  toggleDarkMode
})(SidebarFooter);
