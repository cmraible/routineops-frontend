import { Box, Layer, Text } from 'grommet';
import { Close } from 'grommet-icons';
import React, { useState } from 'react';


const Error = ({ message }) => {

  if (message) return (
    <Layer
      position="top"
      modal={false}
      margin={{vertical: "medium"}}
      plain
    >
      
      <Box 
        background="status-critical"
        direction="row"
        elevation="medium"
        round="medium"
        gap="medium"
        pad={{vertical: "small", horizontal: "medium"}}
      >
        <Text>{(message) ? message : 'An error occurred.'}</Text>
      </Box>
    </Layer>
  )
  else return null
}

export default Error
