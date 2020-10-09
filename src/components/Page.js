import { Box, Grid, Heading, Main, ResponsiveContext, Text } from 'grommet';
import React, { useEffect } from 'react';


const Page = ({ title, children, primary_action, secondary_action }) => {

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
              return (
                <Main direction="column" background="background-back">
                  <Box
                    style={{position: "absolute", top: 0}}
                    width="100%"
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
                      <Box gridArea="title" align="center" justify="center"><Text weight="bold" margin="none" size="xlarge" textAlign="center">{ title}</Text></Box>
                      <Box gridArea="primary_action" align="end" justify="center" pad={{horizontal:"medium"}}>{primary_action}</Box>
                    </Grid>
                  </Box>
                  <Box margin={{top: "xlarge"}}>
                    {children}
                  </Box>
                </Main>
              )
            default:
              return (
                <Main pad="medium" direction="column" gap="medium">
                  <Box direction="row-responsive" justify="between" gap="medium" flex={false}>
                    <Heading margin={{vertical: "none"}}>{ title }</Heading>
                    { primary_action }
                  </Box>
                  {children}
                </Main>
              )
          }
        }
      }

    </ResponsiveContext.Consumer>

  )
}

export default Page;
