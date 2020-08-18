import { Box, Button, Form, FormField, Heading, Main, Text, TextInput } from 'grommet';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions/auth.actions';
import Spinner from '../components/Spinner';
import EmailField from '../components/EmailField';
import { getInvitation } from '../actions/invitation.actions';


const Invite = ({ match, invitation, signup, signupErrors, isFetching, getInvitation }) => {

  const invite_id = match.params.invite_id

  useEffect(() => {
    getInvitation(invite_id)
  }, [getInvitation, invite_id]);

  const email = (invitation) ? (invitation.email_address) : '' ;
  
  const [value, setValue] = useState({
    email: (email) ? email : '',
    password1: '',
    password2: '',
    invitation: invite_id
  });

  useEffect(() => {
    document.title = 'Sign up';
    window.analytics.page(document.title);
  });

  const message = (value.password1 !== value.password2) ? "Passwords do not match." : undefined;

  const validatePassword = (password) => {
    if (password.length >= 9) {
      return true
    } else {
      return {
        'message': 'Password must be at least 9 characters.',
        'status': 'error'
      }
    }
  }

  const handleSubmit = ({value}) => {
    if (value.password1 === value.password2) {
      signup(value)
    }
  }

  

  return (
    <Main pad="xlarge">
      <Box direction="row" align="center" gap="large" flex={false}>
        <Heading size="large">Welcome.</Heading>
        <Spinner isFetching={isFetching} error={signupErrors} />
      </Box>
      <Text size="small" color="status-error">{signupErrors}</Text>
        <Box width="large" flex={false}>
          <Heading level={3}>Create an account.</Heading>
          <Form
            value={value}
            onChange={ nextValue => setValue(nextValue) }
            onSubmit={handleSubmit}
            validate="submit"
          >
            <EmailField required={true} />
            <FormField name="password1" label="Create Password" required validate={validatePassword} > 
              <TextInput name="password1" type="password" />
            </FormField>
            <FormField name="password2" label="Confirm Password" required validate={validatePassword} >
              <TextInput name="password2" type="password" />
            </FormField>
            {message && (
              <Box pad={{ horizontal: 'small' }}>
                <Text color="status-error">{message}</Text>
              </Box>
            )}
            <Box direction="row" gap="medium" pad="small">
              <Button type="submit" primary label="Sign up" size="large" disabled={isFetching || value.password1 !== value.password2} />
            </Box>
          </Form>
      </Box>
    </Main>
  )
}

const mapStateToProps = state => ({
  signupErrors: state.auth.signupErrors,
  signupSuccess: state.auth.signupSuccess,
  isFetching: state.auth.isFetching,
  invitation: state.invitation.invitation
});

export default connect(mapStateToProps, { signup, getInvitation })(Invite)
