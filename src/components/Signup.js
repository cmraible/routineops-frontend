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
            <FormField label="First Name">
              <TextInput name="first_name" required />
            </FormField>
            <FormField label="Last Name">
              <TextInput name="last_name" required />
            </FormField>
            <FormField name="email" htmlfor="email-id" validate={validateEmailField} label="Work Email">
              <TextInput id="email-id" name="email" required />
            </FormField>
            <FormField name="phone" htmlfor="phone-id" label="Direct Phone Number">
              <TextInput id="phone-id" name="phone" required />
            </FormField>
            <FormField name="password" htmlfor="password-id" label="Create Password">
              <TextInput id="password-id" name="password" type="password" required />
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
