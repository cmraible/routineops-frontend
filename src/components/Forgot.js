import { Box, Button, Form, Heading, Main, Text } from 'grommet';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { forgot } from '../actions/auth.actions';
import { goToLogin } from '../actions/ui.actions';
import Error from './Error';
import Spinner from './Spinner';
import BackButton from './BackButton';
import EmailField from './EmailField';
import { Mixpanel } from '../mixpanel';


const Forgot = ({forgot, isFetching, goToLogin}) => {

  useEffect(() => {
    document.title = 'Forgot password';
    Mixpanel.track('Viewed forgot password page.');
    window.Intercom('update');
  }, []);

  const handleSubmit = ({value}) => {
    forgot(value.email)
  }

  return (
    <Main pad="xlarge">
      <BackButton onClick={goToLogin} label="Login" />
      <Box direction="row" align="center" gap="large">
        <Heading>Forgot your password?</Heading>
        <Spinner isFetching={isFetching} error={undefined} />
      </Box>
      <Error message={undefined} />
      <Text size="small" color="status-error">{}</Text>
      <Form
        onSubmit={handleSubmit}
        validate="blur"
      >
        <EmailField required={true} />
        <Box direction="row" gap="medium" pad="small">
          <Button type="submit" primary label="Submit" size="large" />
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

export default connect(mapStateToProps, {forgot, goToLogin})(Forgot)
