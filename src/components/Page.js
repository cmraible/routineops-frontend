import { Box, Button, Heading, Main, ResponsiveContext } from 'grommet';
import { LinkPrevious } from 'grommet-icons';
import React, { useEffect } from 'react';
import MobileHeader from './MobileHeader';

const Page = ({ title, header, children, action, previous, pad }) => {

  useEffect(() => {
    document.title = title;
    window.analytics.page(title);
    window.analytics.ready(() => {
      if (window.innerWidth < 768) {
        window.Intercom('update', {
          "hide_default_launcher": true
        })
      } else {
        window.Intercom('update', {
          "hide_default_launcher": false
        })
      }
    });
  }, [title]);


  document.body.style = `background-color: black`

  return (
    <ResponsiveContext.Consumer>
      {
        size => {
          switch (size) {
            case 'small':
              return (
                <Main>
                  <MobileHeader action={action} title={title} header={header} />
                  <Box pad={pad || "none"}>
                    {children}
                  </Box>
                  <Box pad="large" />
                </Main>
              )
            default:
              return (
                <Main
                  direction="column"
                  full
                  style={{overflow: "hidden"}}
                >
                    <Box
                      style={{position: "sticky", top: 0, zIndex: 10}}
                      direction="row"
                      pad={{horizontal: "small", vertical: "xsmall"}}
                      elevation="xsmall"
                      justify="between"
                      gap="medium"
                      fill="horizontal"
                      flex={false}
                      background="background-contrast"
                    >
                      <Box direction="row" align="center" gap="small">
                        {(previous &&
                        <Box
                          round="full"
                          pad="small"
                          animation="slideRight"
                          hoverIndicator
                          onClick={previous}
                          data-cy="previous"
                        >
                          <LinkPrevious />
                        </Box>
                        )}
                        {!header && (
                          <Heading size="small" margin={{vertical: "none"}}>{ title }</Heading>
                        )}
                        {header && (
                          header
                        )}
                      </Box>
                      <Box>
                       {(action && <Button data-cy="action" {...action} /> )}

                      </Box>
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
