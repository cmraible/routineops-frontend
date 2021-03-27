import { Box, Heading, Image, Main } from 'grommet';
import React, { useEffect } from 'react';


const AccountPage = ({ title, hide_title, children, primary_action, secondary_action }) => {

  useEffect(() => {
    document.title = title;
    window.analytics.page(title);
  }, [title]);

  return (
    <Main gap="large" fill="vertical">

      <Box pad={{top: "xlarge", horizontal: "medium"}} width="medium" alignSelf="start" border={{"side": "right"}} fill="vertical">
        <Box height="xsmall" width="xsmall" alignSelf="center">
          <Image src="/routineops-logo.svg" fit="contain" alt="logo-square" />
        </Box>
        <Heading level={2} size="xsmall" textAlign="center">{ title }</Heading>
          { children }
      </Box>
    </Main>

  )
}

export default AccountPage;
