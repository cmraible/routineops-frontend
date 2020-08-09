import { Box, Button, Form, FormField, Heading, Main, TextInput } from 'grommet';
import { LinkNext } from 'grommet-icons';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { saveUser } from '../actions/user.actions';
import { Mixpanel } from '../mixpanel';

import Spinner from '../components/Spinner';
import { getLoggedInUser } from '../reducers/reducers';


const OnboardUser = ({ isFetching, user, saveUser }) => {

  const [value, setValue] = useState({
    id: user.id,
    first_name: (user) ? user.first_name : '',
    last_name: (user) ? user.last_name : '',
    phone: (user.phone) ? user.phone : ''
  })

  useEffect(() => {
    document.title = 'Welcome';
    Mixpanel.track('Viewed onboard user page.');
    window.Intercom('update');
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
      <Box width="large" flex={false} animation={{type: 'slideLeft', duration: 300, size: 'large'}}>
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
            <Button fill="horizontal" align="center" type="submit" label="Continue" size="large" icon={<LinkNext />} reverse primary />
        </Form>
      </Box>
    </Main>
  )
}

const mapStateToProps = state => ({
  isFetching: state.auth.isFetching,
  user: getLoggedInUser(state),
  
});

export default connect(mapStateToProps, { saveUser })(OnboardUser);
