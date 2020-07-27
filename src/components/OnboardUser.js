import { Box, Button, Form, FormField, Heading, Image, Main, TextInput } from 'grommet';
import { LinkNext } from 'grommet-icons';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { goToOnboardOrg } from '../actions/ui.actions';
import { saveUser } from '../actions/user.actions';
import { Mixpanel } from '../mixpanel';

import Spinner from './Spinner';


const OnboardUser = ({ goToOnboardOrg, isFetching, user, saveUser }) => {

  const [value, setValue] = useState(user)

  useEffect(() => {
    Mixpanel.track('Viewed onboard user page.');
  }, []);

  const handleSubmit = ({value}) => {
    saveUser(value);
  }

  return (
    <Main pad="xlarge">
      <Box direction="row" align="center" gap="large">
        <Heading size="large">Welcome.</Heading>
        <Spinner isFetching={isFetching} />
      </Box>

      <Box direction="row-responsive" align="center" justify="start" fill="horizontal" gap="xlarge">
          <Box width="large">
            <Heading level={3}>Tell us about yourself.</Heading>
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
              <Button fill align="center" type="submit" label="Continue" size="large" icon={<LinkNext />} reverse primary />
            </Form>
          </Box>
          <Box width="large">
            <Image src={process.env.PUBLIC_URL + "/undraw_profile_6l1l.svg"} />
          </Box>
      </Box>
    </Main>
  )
}

const mapStateToProps = state => ({
  isFetching: state.auth.isFetching,
  user: state.user.user,
  
});

export default connect(mapStateToProps, { saveUser, goToOnboardOrg })(OnboardUser);
