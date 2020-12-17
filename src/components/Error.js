import { Box, Text } from 'grommet';
import React from 'react';


const Error = ({ message }) => {

  if (message) {
    return (
      <Box
        round={true}
        pad="small"
        border={{color: "status-critical"}}
        background={{color: "status-critical", opacity: "weak"}}
      >
        <Text color="status-critical" textAlign="center"> { message }</Text>
      </Box>
    )
  } else {
    return null;
  }


}

export default Error
