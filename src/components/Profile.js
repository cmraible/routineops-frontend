import React from 'react';
import { connect } from 'react-redux';
import { Box, Button, Form, FormField, Heading, Main, Select, TextInput } from 'grommet';
import { saveProfile } from '../actions'


const Profile = ({ saveProfile }) => {

  return (
    <Main pad="large">
      <Heading>Profile</Heading>
      <Heading level={3}>Basic Information</Heading>
      <Form
        onSubmit={({value, touch}) => {
          saveProfile(value)
        }}
      >
        <Box direction="row">
          <FormField label="First Name">
            <TextInput name="first_name" />
          </FormField>
          <FormField label="Last Name">
            <TextInput name="last_name"/>
          </FormField>
        </Box>
        <Box direction="row">
          <FormField label="Email Address">
            <TextInput name="email"/>
          </FormField>
        </Box>
        <Box direction="row">
          <FormField label="Role">
            <Select
              options={["Technician", "Mechanic", "Supervisor", "Manager"]}
            />
          </FormField>
        </Box>
        <Button label="Save" primary size="large" type="submit" />
      </Form>
    </Main>
  )

};

const mapStateToProps = state => {
  return {
    loginError: state.loginError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveProfile: (profile) => {
      dispatch(saveProfile(profile))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
