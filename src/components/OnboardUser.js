import { Box, Button, Form, FormField, Heading, Main, TextInput } from 'grommet';
import { LinkNext } from 'grommet-icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { verifyEmail } from '../actions/auth.actions';
import { goToOnboardOrg } from '../actions/ui.actions';
import { saveUser } from '../actions/user.actions';

import Spinner from './Spinner';


const OnboardUser = ({ goToOnboardOrg, isFetching, user, saveUser }) => {

  const [value, setValue] = useState(user)

  const success = (user.first_name.length > 0 && user.last_name.length > 0)

  const handleSubmit = ({value}) => {
    console.log(value);
    saveUser(value);
  }

  if (success) {
    goToOnboardOrg()
  }

  return (
    <Main align="center" justify="start">
      <Box align="stretch" width="large" margin={{vertical: "large"}}>
        <Heading>Operationally</Heading>
        <Heading level={3}>Tell us about yourself.</Heading>
        <Spinner isFetching={isFetching} />
        <Form
          value={value}
          onChange={ nextValue => setValue(nextValue)}
          onSubmit={handleSubmit}
        >
          <FormField label="First Name" name="first_name" required>
            <TextInput name="first_name" />
          </FormField>
          <FormField label="Last Name" name="last_name" required>
            <TextInput name="last_name" />
          </FormField>
          <FormField label="Phone Number" name="phone">
            <TextInput name="phone" />
          </FormField>
          <Button align="end" type="submit" label="Next" size="large" icon={<LinkNext />} reverse primary />

        </Form>
      </Box>
    </Main>
  )
}

const mapStateToProps = state => ({
  isFetching: state.auth.isFetching,
  user: state.user.user,
  
});

export default connect(mapStateToProps, { saveUser, goToOnboardOrg })(OnboardUser);
