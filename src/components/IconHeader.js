import { Avatar, Header, Menu } from 'grommet';
import { User } from 'grommet-icons';
import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth.actions';
import { goToSettings, goToProfile, toggleDarkMode } from '../actions/ui.actions';


const IconHeader = ({ darkMode, goToProfile, logout, toggleDarkMode, goToSettings, user }) => {
 
  const headerStyle = {
    position: "absolute",
    top: "0px",
    right: "0px"
  }

  let items
  if (user.is_org_admin) {
    items = [
      { label: "Profile", onClick: () => goToProfile() },
      { label: "Settings", onClick: () => goToSettings()},
      { label: (darkMode) ? "Light" : "Dark" , onClick: () => toggleDarkMode() },
      { label: "Logout", onClick: () => logout() }
    ]
  } else {
    items = [
      { label: "Profile", onClick: () => {goToProfile()} },
      { label: (darkMode) ? "Light" : "Dark" , onClick: () => toggleDarkMode() },
      { label: "Logout", onClick: () => {logout()} }
    ]
  }

  return (
      <Header justify="end" pad="small" style={headerStyle}>
          <Menu
            alignSelf="end"
            label={user.first_name + ' ' + user.last_name}
            items={items}
          >
            <Avatar background="white" round="full" size="medium">
                <User color="brand" size="medium"/>
            </Avatar>
          </Menu>
      </Header>
      )

};

const mapStateToProps = state => ({
  darkMode: state.ui.darkMode,
  user: state.user,
});

export default connect(mapStateToProps, {toggleDarkMode, logout, goToProfile, goToSettings})(IconHeader);
