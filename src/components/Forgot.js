import { Box, Button, Form, FormField, Heading, Main, Text, TextInput } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { forgot } from '../actions/auth.actions';
import { goToLogin } from '../actions/ui.actions';
import Error from './Error';
import Spinner from './Spinner';
import BackButton from './BackButton';


const Forgot = ({forgot, isFetching, goToLogin}) => {

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
            onSubmit={({value, touch}) => {
              forgot(value.email)
            }}
            validate="blur"
          >
            <FormField name="email" validate={validateEmailField} label="Email Address" required>
              <TextInput name="email" />
            </FormField>
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
