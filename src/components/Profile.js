import { Box, Button, Form, FormField, Heading, Main, TextInput } from 'grommet';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { saveUser } from '../actions/user.actions';
import { getAllRoles } from '../reducers/reducers';
import Spinner from './Spinner';
import Error from './Error';
import { Mixpanel } from '../mixpanel';


const Profile = ({ onSave, user, roles, isFetching, errors }) => {

  const [ value, setValue ] = useState({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
  });

  useEffect(() => {
    document.title = 'My Profile';
    Mixpanel.track('Viewed profile page.');
    window.Intercom('update');
  }, []);

  return (
    <Main pad="medium">
      <Box direction="row" align="center" gap="large">
        <Heading>Profile</Heading>
        <Spinner isFetching={isFetching} errors={errors} />
        <Error message={errors} />
      </Box>
      <Heading level={3}>Basic Information</Heading>
      <Form
        onSubmit={({value, touch}) => {
          onSave(value)
        }}
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
    </Main>
  )

};

const mapStateToProps = state => ({
  user: state.user.user,
  roles: getAllRoles(state),
  isFetching: state.user.isFetching,
  errors: state.user.errors
});

export default connect(mapStateToProps, { onSave: saveUser })(Profile);
