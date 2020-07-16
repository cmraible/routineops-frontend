import { Anchor, Box, Heading, Main, Paragraph } from 'grommet';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';


const ForgotResetSuccess = () => {

  const [redirect, setRedirect] = useState(false)
  const doRedirect = () => {setRedirect(true)}

  useEffect(() => {
    setTimeout(() => doRedirect(), 5000)
  }, []);

  const content = (
    <Main pad="large" fill>
      <Box size="large" fill>
        <Heading>Done!</Heading>
        <Paragraph>Your password was successfully reset.</Paragraph>
        <Paragraph>You should be redirected to login in just a second.</Paragraph>
        <Paragraph>Otherwise, <Anchor href="/">click here</Anchor> to login.</Paragraph>
      </Box>
    </Main>
  )

  return (redirect) ? <Redirect to="/" /> : content ;
}

export default ForgotResetSuccess;
