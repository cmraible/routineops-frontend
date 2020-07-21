import { Box, Layer, Text } from 'grommet';
import React from 'react';


const Success = ({ message }) => {

  if (message) return (
    <Layer
      position="top"
      modal={false}
      margin={{vertical: "medium"}}
      plain
    >
      
      <Box 
        background="status-ok"
        direction="row"
        elevation="medium"
        round="medium"
        gap="medium"
        pad={{vertical: "small", horizontal: "medium"}}
        animation={{type: "fadeOut", delay: 10000}}
      >
        <Text>{(message) ? message : 'Success!'}</Text>
      </Box>
    </Layer>
  )
  else return null
}

export default Success
