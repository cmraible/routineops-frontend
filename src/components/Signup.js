import { Box, Button, Form, FormField, Heading, Main, Text, TextInput } from 'grommet';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions/auth.actions';
import Spinner from './Spinner';
import EmailField from './EmailField';
import { Mixpanel } from '../mixpanel';
import queryString from 'query-string';


const Signup = ({ location, signup, signupErrors, isFetching }) => {

  const q = queryString.parse(location.search)
  const email = q.email
  
  const [value, setValue] = useState({
    email: (email) ? email : '',
    password1: '',
    password2: ''
  });

  useEffect(() => {
    Mixpanel.track('Viewed signup page.');
  });

  const message = (value.password1 !== value.password2) ? "Passwords do not match." : undefined;

  const validatePassword = (password) => {
    if (password.length >= 9) {
      return true
    } else {
      return {
        'message': 'Password must be at least 9 characters.',
        'status': 'error'
      }
    }
  }

  const handleSubmit = ({value}) => {
    if (value.password1 === value.password2) {
      signup(value)
    }
  }

  

  return (
    <Main pad="xlarge">
      <Box direction="row" align="center" gap="large" flex={false}>
        <Heading size="large">Welcome.</Heading>
        <Spinner isFetching={isFetching} error={signupErrors} />
      </Box>
      <Text size="small" color="status-error">{signupErrors}</Text>
        <Box width="large" flex={false}>
          <Heading level={3}>Create an account.</Heading>
          <Form
            value={value}
            onChange={ nextValue => setValue(nextValue) }
            onSubmit={handleSubmit}
            validate="submit"
          >
            <EmailField required={true} />
            <FormField name="password1" label="Create Password" required validate={validatePassword} > 
              <TextInput name="password1" type="password" />
            </FormField>
            <FormField name="password2" label="Confirm Password" required validate={validatePassword} >
              <TextInput name="password2" type="password" />
            </FormField>
            {message && (
              <Box pad={{ horizontal: 'small' }}>
                <Text color="status-error">{message}</Text>
              </Box>
            )}
            <Box direction="row" gap="medium" pad="small">
              <Button type="submit" primary label="Sign up" size="large" disabled={isFetching || value.password1 !== value.password2} />
            </Box>
          </Form>
      </Box>
    </Main>
  )
}

const mapStateToProps = state => ({
  signupErrors: state.auth.signupErrors,
  signupSuccess: state.auth.signupSuccess,
  isFetching: state.auth.isFetching
});

export default connect(mapStateToProps, { signup })(Signup)
