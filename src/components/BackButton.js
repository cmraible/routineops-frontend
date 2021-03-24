import { Box } from 'grommet';
import { LinkPrevious } from 'grommet-icons';
import React from 'react';


const BackButton = ({ label, ...rest }) => {

  return (
    <Box
      {...rest}
      hoverIndicator
      round="small"
      width="xxsmall"
      height="xxsmall"
      data-cy="back"
      alignSelf="start"
      align="center"
      justify="center"
    >
      <LinkPrevious />
    </Box>
  )
}

export default BackButton
