import { Box, Heading, Text } from 'grommet';
import React from 'react';

const PricingOption = ({ label, price, selected, onClick }) => {

  return (
    <Box 
      align="center"
      border={(selected) ? {color: "status-ok", size: "medium"} : "true"}
      pad="medium" 
      round="small" 
      size="small"
      onClick={onClick}
    >
      <Text>{ label }</Text>
        <Box direction="row" align="start">
          <Text color="text-xweak">$</Text>
          <Heading margin="none">{ price }</Heading>
        </Box>
        <Box>
          <Text color="text-xweak">/ user / month</Text>
        </Box>
      
    </Box>
  );
};

export default PricingOption;
