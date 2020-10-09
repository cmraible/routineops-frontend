import { Box, Collapsible, Grid, Heading, Main, ResponsiveContext } from 'grommet';
import React, { useEffect } from 'react';


const SplitPage = ({ title, children, primary_action, secondary_action, detailView, detail }) => {

  useEffect(() => {
    document.title = title;
    window.analytics.page(title);
  }, [title]);

  document.body.style = `background-color: black;`

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
                  <Main direction="column">
                  <Box
                    style={{position: "absolute", top: 0}}
                    width="100%"
                    elevation="xsmall"
                    pad="xsmall"
                    direction="row"
                    background="black"
                  >
                    <Grid
                      fill
                      rows={['100%']}
                      columns={['1/4', '1/2', '1/4']}
                      areas={[['secondary_action', 'title', 'primary_action']]}
                    >
                      <Box gridArea="secondary_action" align="start" justify="center" pad={{horizontal:"medium"}}>{secondary_action}</Box>
                      <Box gridArea="title" align="center" justify="center"><Heading margin="none" size="small" textAlign="center">{ title}</Heading></Box>
                      <Box gridArea="primary_action" align="end" justify="center" pad={{horizontal:"medium"}}>{primary_action}</Box>
                    </Grid>
                  </Box>
                  <Box margin={{top: "xlarge"}}>
                    {children}
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
                        { primary_action }
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
