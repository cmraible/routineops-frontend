import { Anchor, Box, Button, Form, FormField, Heading, Main, Text, TextInput } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth.actions';
import Error from './Error';
import Spinner from './Spinner';


const Login = ({ onLogin, loginError, isFetching }) => {

    return (
      <Main pad="xlarge">
      <Box direction="row" align="center" gap="large">
          <Heading>Hello.</Heading>
          <Spinner isFetching={isFetching} error={loginError} />
        </Box>
      <Text margin={{bottom: "large"}}>New to Operationally? <Anchor href="/signup/1/">Sign up</Anchor> here.</Text>
      <Error message={loginError} />
      <Form
        onSubmit={({value, touch}) => {
          onLogin(value.email, value.password)
        }}
      >
        <FormField name="email" label="Email Address" required>
          <TextInput name="email" />
        </FormField>
        <FormField name="password" label="Password" required>
          <TextInput name="password" type="password" />
        </FormField>
        <Box align="end">
          <Anchor href="/forgot" size="small">Forgot password?</Anchor>
        </Box>
        <Box direction="row" gap="medium" pad="small">
          <Button type="submit" primary label="Login" size="large" disabled={isFetching} />
        </Box>
      </Form>
    </Main>
  )
}

const mapStateToProps = state => ({
  loginError: state.auth.loginError,
  isFetching: state.auth.isFetching
});

export default connect(mapStateToProps, { onLogin: login })(Login)
