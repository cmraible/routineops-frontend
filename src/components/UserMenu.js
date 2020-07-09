import { Avatar, Box, Header, Menu, Text } from 'grommet';
import { User } from 'grommet-icons';
import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth.actions';
import { goToSettings, goToProfile, toggleDarkMode } from '../actions/ui.actions';


const UserMenu = ({ darkMode, goToProfile, logout, toggleDarkMode, goToSettings, user }) => {

  const items = [
      { label: "Profile", onClick: () => goToProfile() },
      { label: (darkMode) ? "Light" : "Dark" , onClick: () => toggleDarkMode() },
  ]

  return (
    <Box margin={{bottom: "large"}}>
      <Menu
        items={items}
      >
        <Box align="center" direction="row" gap="small">
          <Avatar background="white" round="full" size="medium">
              <User color="brand" size="medium" />
          </Avatar>
          <Text>{user.first_name + ' ' + user.last_name}</Text>
        </Box>
        
      </Menu>
    </Box>
  )

};

const mapStateToProps = state => ({
  darkMode: state.ui.darkMode,
  user: state.user,
});

export default connect(mapStateToProps, {toggleDarkMode, logout, goToProfile, goToSettings})(UserMenu);
