import { Box, Button, Form, FormField, Heading, Main, Text, TextInput } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions/auth.actions';


const Signup = ({onSignup, signupErrors, signupSuccess}) => {

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

  const formErrors = {}
  for (const error in signupErrors) {
    const key = (error === 'username') ? 'email' : error;
    formErrors[key] = signupErrors[error][0]
  }

      return (
        <Main pad="xlarge">
          <Heading>
            Welcome.
          </Heading>
          <Text size="small" color="status-error">{}</Text>
          <Form
            onSubmit={({value, touch}) => {
              onSignup(value)
            }}
            validate="blur"
            errors={formErrors}
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
  signupSuccess: state.auth.signupSuccess
});

export default connect(mapStateToProps, { onSignup: signup })(Signup)
