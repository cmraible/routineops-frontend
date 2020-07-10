import { Box } from 'grommet';
import { PowerCycle } from 'grommet-icons';
import React from 'react';


const Spinner = () => {

  return (
    <Box animation="rotateLeft" align="center">
      <PowerCycle animation="pulse" />
    </Box>
  )
};

export default Spinner;
