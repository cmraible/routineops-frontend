import { Box, Button, Heading, Main, ResponsiveContext } from 'grommet';
import { LinkPrevious } from 'grommet-icons';
import React, { useEffect } from 'react';
import MobileHeader from './MobileHeader';

const Page = ({ title, header, children, action, previous, pad, userMenu }) => {

  useEffect(() => {
    document.title = title;
    window.analytics.page(title);

    // Commented our when Intercom was removed. Code left in case we ever re-integrate
    // window.analytics.ready(() => {
    //   // if (window.innerWidth < 768) {
    //   //   window.Intercom('update', {
    //   //     "hide_default_launcher": true
    //   //   })
    //   // } else {
    //   //   window.Intercom('update', {
    //   //     "hide_default_launcher": false
    //   //   })
    //   // }
    // });

  }, [title]);


  document.body.style = `background-color: black`

  return (
    <ResponsiveContext.Consumer>
      {
        size => {
          switch (size) {
            case 'small':
              return (
                <Main overflow="visible">
                  <MobileHeader userMenu={userMenu} action={action} title={title} header={header} previous={previous} />
                  <Box pad={pad || "none"} flex={false}>
                    {children}
                  </Box>
                </Main>
              )
            default:
              return (
                <Main fill>
                    <Box
                      style={{position: "sticky", top: 0, zIndex: 10}}
                      direction="row"
                      pad={{horizontal: "small", vertical: "xsmall"}}
                      justify="between"
                      gap="medium"
                      fill="horizontal"
                      background="background-contrast"
                      flex={false}
                    >
                      <Box direction="row" align="center" gap="small" flex={false}>
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
                    <Box flex>
                      {children}
                    </Box>
                </Main>
              )
          }
        }
      }

    </ResponsiveContext.Consumer>

  )
}

export default Page;
