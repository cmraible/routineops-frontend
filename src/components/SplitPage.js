import { Box, Heading, Main } from 'grommet';
import React, { useEffect } from 'react';


const SplitPage = ({ title, children, cta_primary, detailView }) => {

  useEffect(() => {
    document.title = title;
    window.analytics.page(title);
  }, [title]);

  return (
    <Main direction="column" gap="medium">
      <Box direction="row" fill="vertical">
        <Box width="50%" border="right" fill="vertical" pad="medium">
          <Box direction="row-responsive" justify="between" gap="medium" flex={false}>
            <Heading margin={{vertical: "none"}}>{ title }</Heading>
            { cta_primary }
          </Box>
          {children}
        </Box>
        <Box width="50%" fill="vertical" pad="medium">
         {detailView()}
        </Box>
      </Box>
      
      
      
      
    </Main>
  )
}

export default SplitPage;
