import { Box, Text } from 'grommet';
import React from 'react';


const Empty = ({ message }) => {

    return (
      <Box
        round={true}
        pad="small"
        border={{color: "text"}}
        background={{color: "text", opacity: "weak"}}
      >
        <Text color="text" textAlign="center"> { message }</Text>
      </Box>
    )



}

export default Empty
