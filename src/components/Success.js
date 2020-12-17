import { Box, Text } from 'grommet';
import React from 'react';


const Success = ({ message }) => {

  if (message) {
    return (
      <Box
        round={true}
        pad="small"
        border={{color: "status-ok"}}
        background={{color: "status-ok", opacity: "weak"}}
      >
        <Text color="status-ok" textAlign="center"> { message }</Text>
      </Box>
    )
  } else {
    return null;
  }


}

export default Success
