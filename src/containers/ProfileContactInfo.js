import { Box, Button, Form, FormField, Heading, TextInput } from 'grommet';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { saveUser } from '../actions/user.actions';
import { getAllRoles, getLoggedInUser } from '../reducers/reducers';


const ProfileContactInfo = ({ saveUser, user, isFetching, darkMode, toggleDarkMode }) => {

  const [ value, setValue ] = useState({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone
  });

  const handleSubmit = () => {
    saveUser(value)
  }

  return (
    <Box>
      <Heading margin="none" level={3}>Contact Info</Heading>
      <Form
        onSubmit={handleSubmit}
        value={value}
        onChange={ nextValue => setValue(nextValue) }
      >
        <FormField label="First Name">
          <TextInput name="first_name" />
        </FormField>
        <FormField label="Last Name">
          <TextInput name="last_name" />
        </FormField>
        <FormField label="Email Address">
          <TextInput name="email" />
        </FormField>
        <FormField label="Phone">
          <TextInput name="phone" />
        </FormField>
        <Button label="Save" primary size="large" type="submit" disabled={isFetching} />
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

export default connect(mapStateToProps, { saveUser })(ProfileContactInfo);
