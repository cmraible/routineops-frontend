import { Box, Button, Form, FormField, Heading, Main, Text, TextInput } from 'grommet';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { reset } from '../actions/auth.actions';
import Error from '../components/Error';
import Spinner from '../components/Spinner';


const ForgotReset = ({ match, isFetching, signupErrors, signupSuccess, reset }) => {

  const uid = match.params.uid
  const token = match.params.token

  useEffect(() => {
    document.title = 'Reset password';
    window.analytics.page(document.title);
  }, []);

  return (
    <Main pad="xlarge">
      <Box direction="row" align="center" gap="large">
        <Heading>Reset.</Heading>
        <Spinner isFetching={isFetching} error={signupErrors} />
      </Box>
      <Error message={signupErrors} />
      <Text size="small" color="status-error">{}</Text>
      <Form
        onSubmit={({value, touch}) => {
          reset(uid, token, value.password1, value.password2)
        }}
        validate="blur"
      >
        <FormField name="password1" label="Create Password" required>
          <TextInput name="password1" type="password" />
        </FormField>
        <FormField name="password2" label="Confirm Password" required>
          <TextInput name="password2" type="password" />
        </FormField>
        <Box direction="row" gap="medium" pad="small">
          <Button type="submit" primary label="Reset Password" size="large" />
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

export default connect(mapStateToProps, {reset})(ForgotReset)
