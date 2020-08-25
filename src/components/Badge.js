import { Box, Text } from 'grommet';
import React from 'react';


const Badge = ({ text, color }) => {

  return (
    <Box round background={color} pad={{vertical: "xsmall", horizontal: "medium"}}>
      <Text weight="bold">{text}</Text>
    </Box>
  )
}

export default Badge
