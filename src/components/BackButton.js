import React from 'react';
import { Box, Button } from 'grommet';
import { Previous } from 'grommet-icons';


const BackButton = ({ onClick, label }) => {

  return (
    <Box align="start" pad="medium">
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
