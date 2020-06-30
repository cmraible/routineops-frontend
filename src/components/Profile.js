import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Form, FormField, Heading, Main, TextInput } from 'grommet';
import { saveUser } from '../actions/user.actions'


const Profile = ({ onSave, user }) => {
  const [ value, setValue ] = useState({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
  });

  return (
    <Main pad="medium">
      <Heading>Profile</Heading>
      <Heading level={3}>Basic Information</Heading>
      <Form
        onSubmit={({value, touch}) => {
          onSave(value)
        }}
        value={value}
        onChange={ nextValue => setValue(nextValue) }
      >
        <Box direction="row">
          <FormField label="First Name">
            <TextInput name="first_name" />
          </FormField>
          <FormField label="Last Name">
            <TextInput name="last_name" />
          </FormField>
        </Box>
        <Box direction="row">
          <FormField label="Email Address">
            <TextInput name="email" />
          </FormField>
        </Box>
        <Button label="Save" primary size="large" type="submit" />
      </Form>
    </Main>
  )

};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { onSave: saveUser })(Profile);
