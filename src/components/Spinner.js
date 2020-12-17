import { Box } from 'grommet';
import { Close, PowerCycle } from 'grommet-icons';
import React from 'react';


const Spinner = ({isFetching, error, color, pad, size}) => {
  if (isFetching) {
    return (
      <Box animation="rotateRight" align="center" pad={pad || "none"}>
        <PowerCycle color={color} size={size || "medium" } />
      </Box>
    )
  }

  if (error) {
    return (
      <Box align="center" animation="fadeOut">
        <Close />
      </Box>
    )
  }
  return null

};

export default Spinner;
