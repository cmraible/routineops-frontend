import React from 'react';
import { connect } from 'react-redux';
import { Box, Button, Form, FormField, Heading, Main, Text, TextInput } from 'grommet';
import { signup } from '../actions/actions'


const Signup = ({signup, signupError}) => {

    return (
      <Main pad="xlarge">
      <Heading>
        Welcome.
      </Heading>
      <Text size="small" color="status-error">{signupError}</Text>
      <Form
        onSubmit={({value, touch}) => {
          signup(value)
        }}
      >
        <FormField>
          <TextInput name="first_name" placeholder="fist name" required />
        </FormField>
        <FormField>
          <TextInput name="last_name" placeholder="last name" required />
        </FormField>
        <FormField name="email" htmlfor="email-id">
          <TextInput id="email-id" name="email" placeholder="work email" required />
        </FormField>
        <FormField name="phone" htmlfor="phone-id">
          <TextInput id="phone-id" name="phone" placeholder="phone" required />
        </FormField>
        <FormField name="password" htmlfor="password-id">
          <TextInput id="password-id" name="password" type="password" placeholder="Password" required />
        </FormField>
        <Box direction="row" gap="medium" pad="small">
          <Button type="submit" primary label="Signup Free" size="large" />
        </Box>
      </Form>
    </Main>
  )
}

const mapStateToProps = state => {
  return {
    signupError: state.signupError
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
