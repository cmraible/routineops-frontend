import { Box, Button, Form, FormField, Heading, Main, Text, TextInput } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions/auth.actions';
import Error from './Error';
import Spinner from './Spinner';


const Signup = ({onSignup, signupErrors, signupSuccess, isFetching}) => {

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const validateEmailField = (value, formvalue) => {
    if (validateEmail(value)) {
      return true
    } else {
      return {
        'message': 'Invalid email address',
        'status': 'error'
      }
    }
  }

      return (
        <Main pad="xlarge">
          <Box direction="row" align="center" gap="large">
            <Heading>Welcome.</Heading>
            <Spinner isFetching={isFetching} error={signupErrors} />
          </Box>
          <Error message={signupErrors} />
          <Text size="small" color="status-error">{}</Text>
          <Form
            onSubmit={({value, touch}) => {
              onSignup(value)
            }}
            validate="blur"
          >
            <FormField name="email" htmlfor="email-id" validate={validateEmailField} label="Work Email" required>
              <TextInput id="email-id" name="email" />
            </FormField>
            <FormField name="password1" label="Create Password" required>
              <TextInput name="password1" type="password" />
            </FormField>
            <FormField name="password2" label="Confirm Password" required>
              <TextInput name="password2" type="password" />
            </FormField>
            <Box direction="row" gap="medium" pad="small">
              <Button type="submit" primary label="Sign up" size="large" />
            </Box>
          </Form>
        </Main>
    )
}

const mapStateToProps = state => ({
  signupErrors: state.auth.signupErrors,
  signupSuccess: state.auth.signupSuccess,
  isFetching: state.auth.isFetching
});

export default connect(mapStateToProps, { onSignup: signup })(Signup)
