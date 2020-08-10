import { Box, CheckBox, Heading } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { toggleDarkMode } from '../actions/ui.actions';
import { getLoggedInUser } from '../reducers/reducers';

const ProfileUI = ({ darkMode, toggleDarkMode }) => {

  return (
    <Box gap="medium">
      <Heading margin="none" level={3}>User Interface</Heading>
      <CheckBox toggle label={(darkMode) ? "Dark Mode On" : "Dark Mode Off" } onChange={toggleDarkMode} checked={darkMode} />
    </Box>
  )
};

const mapStateToProps = state => ({
  user: getLoggedInUser(state),
  darkMode: state.ui.darkMode
});

export default connect(mapStateToProps, { toggleDarkMode })(ProfileUI);
