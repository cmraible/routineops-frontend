import { Anchor, Box, Heading, Main, Paragraph } from 'grommet';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { goToCheckout } from '../actions/ui.actions';


const SignupSuccess = ({ match }) => {

  const email = match.params.email
  const email_domain = email.split("@")[1]
  console.log(email_domain)


  return (
    <Main align="center" justify="start">
      <Box align="stretch" width="large" margin={{vertical: "large"}}>
        <Heading>Routine Ops</Heading>
        <Paragraph>Thanks for that!</Paragraph>
        <Paragraph>We just sent you an email with a link to confirm you are the real owner of {email}.</Paragraph>
        {
          (email_domain === 'gmail.com' && <Anchor target="_blank" href="https://gmail.com">Go to Gmail</Anchor>)
        }
        <Paragraph>You won't be able to add users to your team until you confirm your email, but you can get started on your own.</Paragraph>
        <Paragraph>Get ready, here we go!.</Paragraph>
        <Redirect to="/signup/2/" />
      </Box>
    </Main>
  )
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, { goToCheckout })(SignupSuccess);
