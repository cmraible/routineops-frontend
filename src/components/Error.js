import React from 'react';
import { Box, Layer, Text } from 'grommet';


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
        elevation="medium"
        round="medium"
        pad={{vertical: "small", horizontal: "medium"}}
      >
        <Text>{(message) ? message : 'An error occurred.'}</Text>
      </Box>
    </Layer>
  )
  else return null
}

export default Error
