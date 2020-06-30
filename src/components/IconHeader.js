import { Avatar, Box, Button, Header, Menu } from 'grommet';
import { Down, User } from 'grommet-icons';
import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth.actions';
import { goToOrg, goToProfile, toggleDarkMode } from '../actions/ui.actions';


const IconHeader = ({ darkMode, goToOrg, goToProfile, onLogout, onToggleDarkMode, user }) => {

  return (
      <Header background="black" fill="horizontal" pad="small">
        <Box direction="row">
          <Button color="white" plain onClick={() => {goToOrg()} }>Logo</Button>
        </Box>

        <Box direction="row" align="center">

          <Menu
            label={user.first_name + ' ' + user.last_name}
            icon={<Down/>}
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
        </Box>
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
