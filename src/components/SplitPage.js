import { Box, Collapsible, Heading, Main, ResponsiveContext } from 'grommet';
import React, { useEffect } from 'react';


const SplitPage = ({ title, children, cta_primary, detailView, detail }) => {

  useEffect(() => {
    document.title = title;
    window.analytics.page(title);
  }, [title]);

  return (
    <ResponsiveContext.Consumer>
      {
        size => {
          switch (size) {
            case 'small':
              if (detail) {
                return (detailView())
              } else {
                return (
                  <Main direction="column" gap="medium">
                    <Box direction="row" fill>
                      <Box border="right" fill pad="medium">
                        <Box direction="row-responsive" justify="between" gap="medium" flex={false}>
                          <Heading margin={{vertical: "none"}}>{ title }</Heading>
                          { cta_primary }
                        </Box>
                        {children}
                      </Box>
                    </Box>
                  </Main>
                )
              }
            default:
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
                    <Box width="50%" pad="medium">
                      <Collapsible open={detail}>
                        {detailView()}
                      </Collapsible>
                    </Box>
                  </Box>
                </Main>
              )
          }
        }
      }
      
    </ResponsiveContext.Consumer>
    
  )
}

export default SplitPage;
