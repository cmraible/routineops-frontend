import { Anchor, Box, Button, Form, FormField, Heading, Main, Text, TextInput } from 'grommet';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth.actions';
import Spinner from './Spinner';
import { Mixpanel } from '../mixpanel';

const Login = ({ login, loginError, isFetching }) => {

  const handleSubmit = ({value}) => {
    login(value.email, value.password);
  }

  useEffect(() => {
    document.title = 'Login';
    Mixpanel.track('Viewed login page.');
    window.Intercom('update');
  }, []);

  return (
    <Main pad="xlarge">
      <Box direction="row" align="center" gap="large">
        <Heading size="large">Hello.</Heading>
        <Spinner isFetching={isFetching} error={loginError} />
      </Box>
      <Text margin={{bottom: "large"}}>New to Routine Ops? <Anchor href="/signup">Sign up</Anchor> here.</Text>

        <Box width="large">
                    
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
              <Box align="end">
                <Anchor href="/forgot" size="small">Forgot password?</Anchor>
              </Box>
              <Box direction="row">
                <Button fill type="submit" primary label="Login" size="large" disabled={isFetching} />
              </Box>
            </Box>
            
          </Form>
        </Box>
    </Main>
  )
}

const mapStateToProps = state => ({
  loginError: state.auth.loginError,
  isFetching: state.auth.isFetching
});

export default connect(mapStateToProps, { login })(Login)
