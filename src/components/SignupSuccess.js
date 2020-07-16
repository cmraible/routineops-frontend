import { Box, Heading, Main, Paragraph } from 'grommet';
import React from 'react';


const SignupSuccess = () => {

  return (
    <Main pad="large" fill>
      <Box size="large" fill>
        <Heading>One more step!</Heading>
        <Paragraph>Please check the email you provided and click on the link to confirm your email address.</Paragraph>
      </Box>
    </Main>
  )
}

export default SignupSuccess;
