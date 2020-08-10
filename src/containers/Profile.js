import { Anchor, Box, Button, CheckBox, Form, FormField, Heading, Sidebar, TextInput } from 'grommet';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { saveUser } from '../actions/user.actions';
import { toggleDarkMode } from '../actions/ui.actions';
import { getAllRoles, getLoggedInUser } from '../reducers/reducers';
import Page from '../components/Page';
import { Route, Switch, Link } from 'react-router-dom';


const Profile = ({ saveUser, user, isFetching, darkMode, toggleDarkMode }) => {

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

  const BasicInformation =  (props) => (
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

  const UI = (props) => (
    <Box gap="medium">
      <Heading margin="none" level={3}>Preferences</Heading>
      <CheckBox toggle label={(darkMode) ? "Dark Mode On" : "Dark Mode Off" } onChange={toggleDarkMode} checked={darkMode} />
    </Box>
  )

  return (
    <Page title="Profile">
      <Box direction="row-responsive" fill="horizontal">
        <Sidebar pad="medium" border="right" width="small">
          <Box gap="medium">
            <Anchor as={Link} to="/profile/">Contact Info</Anchor>
            <Anchor as={Link} to="/profile/ui">Preferences</Anchor>
          </Box>
        </Sidebar>
        <Box width="large" pad="medium">
          <Switch>
            <Route exact path="/profile" component={BasicInformation} />
            <Route path="/profile/ui" component={UI} />
          </Switch>
        </Box>
      </Box>
    </Page>
  )
};

const mapStateToProps = state => ({
  user: getLoggedInUser(state),
  roles: getAllRoles(state),
  isFetching: state.user.isFetching,
  errors: state.user.errors,
  darkMode: state.ui.darkMode
});

export default connect(mapStateToProps, { saveUser, toggleDarkMode })(Profile);
