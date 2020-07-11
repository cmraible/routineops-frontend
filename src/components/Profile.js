import { Box, Button, Form, FormField, Heading, Main, Select, TextInput } from 'grommet';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { saveUser } from '../actions/user.actions';
import { getAllRoles } from '../reducers/reducers';
import Spinner from './Spinner';
import Error from './Error';


const Profile = ({ onSave, user, roles, isFetching, errors }) => {

  const [ value, setValue ] = useState({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: (user.role) ? user.role : {}  
  });

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
          <FormField label="Role">
            <Select 
              name="role"
              options={roles} 
              labelKey="name"
              valueKey={{
                key: 'id',
                reduce: true
              }}
            />
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
