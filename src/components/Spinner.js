import React from 'react';
import { Box, Button } from 'grommet';
import { PowerCycle } from 'grommet-icons';


const Spinner = () => {

  return (
    <Box animation="rotateLeft" align="center">
      <PowerCycle animation="pulse" />
    </Box>
  )
};

export default Spinner;
