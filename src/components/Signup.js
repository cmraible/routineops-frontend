import React from 'react';
import { connect } from 'react-redux';
import { Box, Button, Form, FormField, Heading, Main, Text, TextInput } from 'grommet';
import { signup } from '../actions/actions'


const Signup = ({signup, signupErrors, signupSuccess}) => {

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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



    if (signupSuccess) {
      return (
        <Main pad="xlarge">
          <Heading>
            Awesome! Check your email to confirm before logging in.
          </Heading>
        </Main>
      )
    } else {

      return (
        <Main pad="xlarge">
          <Heading>
            Welcome.
          </Heading>
          <Text size="small" color="status-error">{}</Text>
          <Form
            onSubmit={({value, touch}) => {
              signup(value)
            }}
            validate="blur"
            errors={formErrors}
          >
            <FormField>
              <TextInput name="first_name" placeholder="fist name" required />
            </FormField>
            <FormField>
              <TextInput name="last_name" placeholder="last name" required />
            </FormField>
            <FormField name="email" htmlfor="email-id" validate={validateEmailField}>
              <TextInput id="email-id" name="email" placeholder="work email" required />
            </FormField>
            <FormField name="phone" htmlfor="phone-id">
              <TextInput id="phone-id" name="phone" placeholder="phone" required />
            </FormField>
            <FormField name="password" htmlfor="password-id">
              <TextInput id="password-id" name="password" type="password" placeholder="password" required />
            </FormField>
            <Box direction="row" gap="medium" pad="small">
              <Button type="submit" primary label="Signup Free" size="large" />
            </Box>
          </Form>
        </Main>
    )
  }
}

const mapStateToProps = state => {
  return {
    signupErrors: state.signupErrors,
    signupSuccess: state.signupSuccess
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signup: (user) => {
      dispatch(signup(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
