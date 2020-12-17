import { Anchor, Box, CheckBox, Form, FormField, Text } from 'grommet';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccountPage from '../../components/AccountPage';
import EmailField from '../../components/EmailField';
import Error from '../../components/Error';
import PasswordField from '../../components/PasswordField';
import SubmitButton from '../../components/SubmitButton';
import { flattenErrors, loginUser } from '../../utils';
import { fetchInvitation, selectInvitationById } from '../invitations/invitationsSlice';
import { login, signup } from './authSlice';



const Signup = ({ location, match }) => {
  const dispatch = useDispatch();

  const q = queryString.parse(location.search)
  const { inviteId } = match.params
  useEffect(() => {
    if (inviteId) {
      dispatch(fetchInvitation(inviteId))
    }
  }, [dispatch, inviteId]);

  const invitation = useSelector(state => selectInvitationById(state, inviteId));

  const email = (invitation) ? invitation.email_address : q.email;

  const [signupStatus, setSignupStatus] = useState('idle');
  const [errors, setErrors] = useState({})
  const [value, setValue] = useState({
    email: (email) ? email : '',
    password1: '',
    password2: '',
    invitation: inviteId,
    disclaimer: false
  });

  const canSubmit = () => {
    if (value.password1 !== value.password2) {
      setErrors({'non_field_errors': 'Passwords do not match.'})
      return false;
    }
    return true
  }

  const handleSubmit = async ({value}) => {
    if (canSubmit()) {
        setSignupStatus('pending');
        setErrors({})
        const resultAction = await dispatch(signup(value));
        if (signup.fulfilled.match(resultAction)) {
          setSignupStatus('succeeded');
          const resultAction = await dispatch(login({
            email: value.email,
            password: value.password1
          }));
          if (login.fulfilled.match(resultAction)) {
            console.log(resultAction)
            loginUser(resultAction.payload.user, resultAction.payload.key)
          }
        } else {
          setSignupStatus('failed')
          if (resultAction.payload) {
            // Request completed successfully but returned field errors
            setErrors(flattenErrors(resultAction.payload))
          } else {
            // Request failed for unknown reason. Show the message.
            setErrors({'non_field_errors': resultAction.error.message})
          }
        }
    }
  }

  return (
    <AccountPage title="Sign up">
      <Error message={(errors && errors['non_field_errors']) ? errors['non_field_errors'] : undefined} />
      <Form
          value={value}
          onChange={ nextValue => setValue(nextValue) }
          onSubmit={handleSubmit}
          errors={errors}
          validate="submit"
        >
          <Box flex={false} gap="medium">
            <EmailField autoFocus required={true} />
            <PasswordField name="password1" label="Create password" required />
            <PasswordField name="password2" label="Confirm password" required validate={false} />
            <Box direction="row" gap="medium">
              <FormField name="disclaimer" required>
                <CheckBox
                  name="disclaimer"
                  id="disclaimer"
                  label={(
                    <Text size="small">By creating an account, you are agreeing to our <Anchor target="_blank" href="https://routineops.com/privacy-policy">Privacy Policy</Anchor> and <Anchor target="_blank" href="https://routineops.com/terms-of-service">Terms of Service</Anchor>.</Text>
                  )}
                />
              </FormField>

            </Box>
            <SubmitButton label="Sign Up" loadingIndicator={signupStatus === 'pending'} />
            <Box direction="row" justify="center" gap="small">
              <Text size="small">Already have an account? <Anchor href="/login" size="small">Login</Anchor></Text>
            </Box>
          </Box>
        </Form>
    </AccountPage>
  )
}

export default Signup;
