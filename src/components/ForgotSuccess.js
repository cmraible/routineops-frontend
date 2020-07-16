import { Box, Heading, Main, Paragraph } from 'grommet';
import React from 'react';


const ForgotSuccess = () => {

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
