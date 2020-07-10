import { Box, Button } from 'grommet';
import { Previous } from 'grommet-icons';
import React from 'react';


const BackButton = ({ onClick, label }) => {

  return (
    <Box align="start">
      <Button
        primary
        icon={<Previous size="small" />}
        onClick={onClick}
        label={label}
      />
    </Box>
  )
}

export default BackButton
