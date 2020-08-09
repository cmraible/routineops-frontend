import { Box, Heading, Main } from 'grommet';
import React, { useEffect } from 'react';
import { Mixpanel } from '../mixpanel';


const Page = ({ title, children, cta_primary }) => {

  useEffect(() => {
    document.title = title;
    Mixpanel.track(`Viewed ${title.toLowerCase()} page.`);
    window.Intercom('update');
  }, [title]);

  return (
    <Main pad="medium" direction="column" gap="medium">
      <Box direction="row-responsive" justify="between" gap="medium" flex={false}>
        <Heading margin={{vertical: "none"}}>{ title }</Heading>
        { cta_primary }
      </Box>
      {children}
    </Main>
  )
}

export default Page;
