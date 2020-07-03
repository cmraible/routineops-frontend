import { Avatar, Header, Menu } from 'grommet';
import { User } from 'grommet-icons';
import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth.actions';
import { goToOrg, goToProfile, toggleDarkMode } from '../actions/ui.actions';


const IconHeader = ({ darkMode, goToOrg, goToProfile, onLogout, onToggleDarkMode, user }) => {
  const headerStyle = {
    position: "absolute",
    width: "100%",
    top: "0px"
  }
  return (
      <Header justify="end" fill="horizontal" pad="small" style={headerStyle}>
          <Menu
            alignSelf="end"
            label={user.first_name + ' ' + user.last_name}
            items={[
              { label: "Profile", onClick: () => {goToProfile()} },
              { label: (darkMode) ? "Light" : "Dark" , onClick: () => {onToggleDarkMode()} },
              { label: "Logout", onClick: () => {onLogout()} }
            ]}
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

const mapDispatchToProps = dispatch => ({
  onToggleDarkMode: () => {
    dispatch(toggleDarkMode())
  },
  onLogout: () => {
    dispatch(logout())
  },
  goToProfile: () => {
    dispatch(goToProfile())
  },
  goToOrg: () => {
    dispatch(goToOrg())
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(IconHeader);
