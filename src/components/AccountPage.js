import { Box, Heading, Main } from 'grommet';
import React, { useEffect } from 'react';
import Logo from './Logo';


const AccountPage = ({ title, hide_title, children, primary_action, secondary_action }) => {

  useEffect(() => {
    document.title = title;
    window.analytics.page(title);
  }, [title]);

  return (
    <Main gap="large" fill="vertical" flex={false}>
        <Box pad="medium" flex={false} width="medium" alignSelf="center" fill="vertical">
          <Box height="xsmall" flex={false} width="xsmall" alignSelf="center" style={{fill: "white"}}>
            <Logo />
          </Box>
          <Heading level={2} size="xsmall" textAlign="center">{ title }</Heading>
          <Box flex={false}>
          { children }
          </Box>
        </Box>
    </Main>
  )
}

export default AccountPage;
