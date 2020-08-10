import { Box, Button, CheckBox, Form, Heading } from 'grommet';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { saveUser } from '../actions/user.actions';
import { getAllRoles, getLoggedInUser } from '../reducers/reducers';


const ProfileNotifications = ({ saveUser, user, isFetching, darkMode, toggleDarkMode }) => {

  const [ value, setValue ] = useState({
      id: user.id,
      daily_digest: true
  });

  const handleSubmit = () => {
    saveUser(value)
  }

  return (
    <Box gap="medium">
      <Heading margin="none" level={3}>Notifications</Heading>
      <Form
        onSubmit={handleSubmit}
        value={value}
        onChange={ nextValue => setValue(nextValue) }
      >
        <Box gap="medium" fill={false} flex={false}>
          <CheckBox toggle label="Daily Digest" name="daily_digest" />
          <Button label="Save" fill={false} primary type="submit" disabled={isFetching} />
        </Box>
        
      </Form>
    </Box>
  )
};

const mapStateToProps = state => ({
  user: getLoggedInUser(state),
  roles: getAllRoles(state),
  isFetching: state.user.isFetching,
  errors: state.user.errors,
  darkMode: state.ui.darkMode
});

export default connect(mapStateToProps, { saveUser })(ProfileNotifications);
