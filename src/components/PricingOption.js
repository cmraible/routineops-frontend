import { Box, Heading, Text } from 'grommet';
import React from 'react';

const PricingOption = ({ label, price, selected, onClick }) => {

  return (
    <Box direction="column" align="center" gap="small">
      <Box 
        align="center"
        border={(selected) ? {color: "status-ok", size: "small"} : true}
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
      <Text>{(selected) ? "Selected" : ''}</Text>
    </Box>
    
  );
};

export default PricingOption;
