import { Box, Heading, Main, Paragraph } from 'grommet';
import React, { useEffect } from 'react';
import { Mixpanel } from '../mixpanel';


const ForgotSuccess = () => {

  useEffect(() => {
    document.title = 'Forgot password success';
    Mixpanel.track('Viewed forgot password success page.');
    window.Intercom('update');
  }, []);

  return (
    <Main pad="large" fill>
      <Box size="large" fill>
        <Heading>Great!</Heading>
        <Paragraph>If we found an account matching that email, you should receive link to reset your password in a few minutes.</Paragraph>
      </Box>
    </Main>
  )
}
  
export default ForgotSuccess;
