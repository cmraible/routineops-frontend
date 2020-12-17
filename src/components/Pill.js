import { Box, Text } from 'grommet';
import React from 'react';


const Pill = ({text}) => {
  return (
    <Box
      pad="small"
      round={true}
      border={true}
      justify="between"
    >
      <Text textAlign="center" size="small">{text}</Text>
    </Box>
  )
};

export default Pill;
