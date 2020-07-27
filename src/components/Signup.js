import { Box, Button, Form, FormField, Heading, Image, Main, Text, TextInput } from 'grommet';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions/auth.actions';
import Error from './Error';
import Spinner from './Spinner';
import EmailField from './EmailField';
import { Mixpanel } from '../mixpanel';


const Signup = ({ match, signup, signupErrors, signupSuccess, isFetching }) => {
  
  const email = match.params.email

  const [value, setValue] = useState({
    email: (email) ? email : '',
    password1: '',
    password2: ''
  });

  useEffect(() => {
    Mixpanel.track('Viewed signup page.');
  });

  const handleSubmit = ({value}) => {
    signup(value)
  }

  return (
    <Main pad="xlarge">
      <Box direction="row" align="center" gap="large">
        <Heading size="large">Welcome.</Heading>
        <Spinner isFetching={isFetching} error={signupErrors} />
      </Box>
      <Error message={signupErrors} />
      <Text size="small" color="status-error">{}</Text>
      <Box direction="row-responsive" align="center" justify="start" fill="horizontal" gap="xlarge">
        <Box width="large">
          <Heading level={3}>Create an account.</Heading>
          <Form
            value={value}
            onChange={ nextValue => setValue(nextValue) }
            onSubmit={handleSubmit}
            validate="blur"
          >
            <Box flex={false}>
            <EmailField required={true} />
            <FormField name="password1" label="Create Password" required>
              <TextInput name="password1" type="password" />
            </FormField>
            <FormField name="password2" label="Confirm Password" required>
              <TextInput name="password2" type="password" />
            </FormField>
            <Box direction="row" gap="medium" pad="small">
              <Button type="submit" primary label="Sign up" size="large" />
            </Box>
            </Box>
            
          </Form>
        </Box>
        <Box width="large">
          <Image src={process.env.PUBLIC_URL + "/undraw_sign_in_e6hj.svg"} />
        </Box>
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
