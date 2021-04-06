import { Box, Button, Heading, Main, ResponsiveContext } from 'grommet';
import React, { useEffect } from 'react';
import MobileHeader from './MobileHeader';
import { LinkPrevious } from 'grommet-icons';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

const Page = ({ title, children, action, previous, pad }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = title;
    window.analytics.page(title);
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
                  <MobileHeader previous={previous} action={action} title={title} />
                  <Box pad={pad || "none"}>
                    {children}
                  </Box>
                  <Box pad="large" />
                </Main>
              )
            default:
              return (
                <Box  direction="column" fill>
                    <Box
                      direction="row"
                      pad={{horizontal: "small", vertical: "xsmall"}}
                      justify="between"
                      gap="medium"
                      fill="horizontal"
                      flex={false}
                      height="xxsmall"
                      background="background-contrast"
                    >
                      <Box direction="row" align="center" gap="small">
                        {(previous &&
                        <Box
                          round="full"
                          pad="small"
                          animation="slideRight"
                          hoverIndicator
                          onClick={() => dispatch(push(previous))}
                          data-cy="previous"
                        >
                          <LinkPrevious />
                        </Box>
                        )}
                        <Heading size="small" margin={{vertical: "none"}}>{ title }</Heading>
                      </Box>
                      {(action && <Button data-cy="action" primary {...action} /> )}
                    </Box>
                  {children}
                </Box>
              )
          }
        }
      }

    </ResponsiveContext.Consumer>

  )
}

export default Page;
