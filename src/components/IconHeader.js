import React from 'react';
import { Avatar, Box, Button, Header, Menu } from 'grommet';
import { Down, User } from 'grommet-icons';
import { connect } from 'react-redux';
import { logout, getOrg } from '../actions/actions'
import { goToProfile, goToOrg, toggleDarkMode } from '../actions/ui.actions'


const IconHeader = ({ logout, toggleDarkMode, darkMode, goToProfile, goToOrg, user }) => {

  return (
      <Header background="black" fill="horizontal" pad="small">
        <Box direction="row">
          <Button color="white" plain onClick={() => {goToOrg()} }>Logo</Button>
        </Box>

        <Box direction="row" align="center">

          <Menu
            label={user.first_name + ' ' + user.last_name}
            icon=<Down />
            items={[
              { label: "Profile", onClick: () => {goToProfile()} },
              { label: (darkMode) ? "Light" : "Dark" , onClick: () => {toggleDarkMode()} },
              { label: "Logout", onClick: () => {logout()} }

            ]}
          >
            <Avatar background="white" round="full" size="small">
                <User color="brand" size="small"/>
            </Avatar>
          </Menu>
        </Box>
      </Header>
  )

};

const mapStateToProps = state => {
  return {
    darkMode: state.darkMode,
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleDarkMode: () => {
      dispatch(toggleDarkMode())
    },
    logout: () => {
      dispatch(logout())
    },
    goToProfile: () => {
      dispatch(goToProfile())
    },
    goToOrg: () => {
      dispatch(goToOrg())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(IconHeader);
