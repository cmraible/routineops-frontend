import React from 'react';
import { connect } from 'react-redux';
import { Box, Button, Form, FormField, Heading, Main, Text, TextInput } from 'grommet';

const Login = ({loginFunction, loginError}) => {

    return (
      <Main pad="xlarge">
      <Heading>
        Hello.
      </Heading>
      <Text size="small" color="status-error">{loginError}</Text>
      <Form
        onSubmit={({value, touch}) => {
          loginFunction(value.username, value.password)
        }}
      >
        <FormField name="username" htmlfor="username-id">
          <TextInput id="username-id" name="username" placeholder="Username" />
        </FormField>
        <FormField name="password" htmlfor="password-id">
          <TextInput id="password-id" name="password" type="password" placeholder="Password" />
        </FormField>
        <Box direction="row" gap="medium" pad="small">
          <Button type="submit" primary label="Login" size="large" />
        </Box>
      </Form>
    </Main>
  )
}

const mapStateToProps = state => {
  return {
    loginError: state.loginError
  }
}

export default connect(mapStateToProps)(Login)
