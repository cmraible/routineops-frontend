import { Button, Form, FormField, Heading, TextInput } from 'grommet';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { saveUser } from '../actions/user.actions';
import { getAllRoles, getLoggedInUser } from '../reducers/reducers';
import Page from '../components/Page';


const Profile = ({ saveUser, user, isFetching }) => {

  const [ value, setValue ] = useState({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
  });

  const handleSubmit = () => {
    saveUser(value)
  }

  return (
    <Page title="Profile">
      <Heading level={3}>Basic Information</Heading>
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
        <Button label="Save" primary size="large" type="submit" disabled={isFetching} />
      </Form>
    </Page>
  )

};

const mapStateToProps = state => ({
  user: getLoggedInUser(state),
  roles: getAllRoles(state),
  isFetching: state.user.isFetching,
  errors: state.user.errors
});

export default connect(mapStateToProps, { saveUser })(Profile);
