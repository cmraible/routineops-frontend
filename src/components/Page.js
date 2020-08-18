import { Box, Heading, Main } from 'grommet';
import React, { useEffect } from 'react';


const Page = ({ title, children, cta_primary }) => {

  useEffect(() => {
    document.title = title;
    window.analytics.page(title);
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
