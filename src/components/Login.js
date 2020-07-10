import { Anchor, Box, Button, Form, FormField, Heading, Main, Text, TextInput } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth.actions';
import Error from './Error.js';


const Login = ({onLogin, loginError}) => {

    return (
      <Main pad="xlarge">
      <Heading>
        Hello.
      </Heading>
      <Text margin={{bottom: "large"}}>New to Operationally? <Anchor href="/signup">Sign up</Anchor> here.</Text>
      <Error message={loginError} />
      <Form
        onSubmit={({value, touch}) => {
          onLogin(value.username, value.password)
        }}
      >
        <FormField name="username" htmlfor="username-id" label="Email Address">
          <TextInput id="username-id" name="username" required />
        </FormField>
        <FormField name="password" htmlfor="password-id" label="Password">
          <TextInput id="password-id" name="password" type="password" required />
        </FormField>
        <Box direction="row" gap="medium" pad="small">
          <Button type="submit" primary label="Login" size="large" />
        </Box>
      </Form>
    </Main>
  )
}

const mapStateToProps = state => ({
  loginError: state.auth.loginError
});

export default connect(mapStateToProps, { onLogin: login })(Login)
