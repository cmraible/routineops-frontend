import { Anchor, Box, Button, Form, FormField, Image, Main, Text, TextInput } from 'grommet';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth.actions';

const Login = ({ login, loginError, isFetching }) => {

  const handleSubmit = ({value}) => {
    login(value.email, value.password);
  }

  useEffect(() => {
    document.title = 'Login';
    window.analytics.page(document.title);
  }, []);

  return (
    <Main pad={{vertical: "xlarge", horizontal: "medium"}} gap="large">
      <Box height="xsmall" width="xsmall" alignSelf="center">
        <Image src="/logo-square.png" fit="contain"/>
      </Box>
      <Box>
        <Form
          onSubmit={handleSubmit}
        >
          <Box flex={false} gap="small">
            <Text size="small" color="status-error">{loginError}</Text>

            <FormField name="email" label="Email Address" required>
              <TextInput name="email" />
            </FormField>
            <FormField name="password" label="Password" required>
              <TextInput name="password" type="password" />
            </FormField>
            <Box direction="row">
              <Button fill type="submit" primary label="Login" size="large" disabled={isFetching} />
            </Box>
          </Box>
        </Form>
      </Box>
      <Box>
        <Box direction="row" justify="center" gap="small">
          <Anchor href="/forgot" size="small">Forgot password?</Anchor>
          <Anchor href="/signup" size="small">Sign up for Routine Ops</Anchor>
        </Box>
      </Box>
    </Main>
  )
}

const mapStateToProps = state => ({
  loginError: state.auth.loginError,
  isFetching: state.auth.isFetching
});

export default connect(mapStateToProps, { login })(Login)
