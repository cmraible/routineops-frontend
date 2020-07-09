import React from 'react';
import { Box, Button } from 'grommet';
import { Previous } from 'grommet-icons';


const BackButton = ({ onClick, label }) => {

  const headerStyle = {
    position: "absolute",
    top: "0px",
    left: "0px"
  }

  return (
    <Box align="start" style={headerStyle} pad="medium">
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
