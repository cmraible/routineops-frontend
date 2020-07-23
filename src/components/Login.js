import { Anchor, Box, Button, Form, FormField, Heading, Image, Main, Text, TextInput } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth.actions';
import Error from './Error';
import Spinner from './Spinner';


const Login = ({ onLogin, loginError, isFetching }) => {

    return (
      <Main pad="xlarge">
        <Box direction="row" align="center" gap="large">
          <Heading size="large">Hello.</Heading>
          <Spinner isFetching={isFetching} error={loginError} />
        </Box>
        <Text margin={{bottom: "large"}}>New to Routine Ops? <Anchor href="/signup/1/">Sign up</Anchor> here.</Text>

        <Box direction="row-responsive" align="center" justify="start" fill="horizontal" gap="xlarge">
          <Box width="large">
            
            <Error message={loginError} />
            <Form
              onSubmit={({value, touch}) => {
                onLogin(value.email, value.password)
              }}
            >
              <Box flex={false} gap="small">
                <FormField name="email" label="Email Address" required>
                  <TextInput name="email" />
                </FormField>
                <FormField name="password" label="Password" required>
                  <TextInput name="password" type="password" />
                </FormField>
                <Box align="end">
                  <Anchor href="/forgot" size="small">Forgot password?</Anchor>
                </Box>
                <Box direction="row">
                  <Button fill type="submit" primary label="Login" size="large" disabled={isFetching} />
                </Box>
              </Box>
             
            </Form>
          </Box>
          <Box width="large">
            <Image fill="horizontal" src={process.env.PUBLIC_URL + "/undraw_Hello_qnas.svg"} />
          </Box>
        </Box>
      </Main>
  )
}

const mapStateToProps = state => ({
  loginError: state.auth.loginError,
  isFetching: state.auth.isFetching
});

export default connect(mapStateToProps, { onLogin: login })(Login)
