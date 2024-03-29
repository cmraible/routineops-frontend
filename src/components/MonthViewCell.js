import { Box } from 'grommet';
import { Checkmark, Close, Subtract } from 'grommet-icons';
import React from 'react';


const MonthViewCell = ({ date, layer, status }) => {
  
  switch(status) {
    case 'OK':
      return (
        <Box align="center" background="status-ok" fill pad="small">
          <Checkmark color="white" />
        </Box>
      )
    case 'OVERDUE':
      return (
        <Box align="center" background="status-critical" fill pad="small">
          <Close color="white" />
        </Box>
      )
    default:
      return (
        <Box align="center" background="status-disabled" fill pad="small">
          <Subtract color="white" />
        </Box>
      )
  }



};

export default MonthViewCell;
