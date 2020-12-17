import { Box, Heading } from 'grommet';
import React from 'react';
import { Down, Up } from 'grommet-icons';


const AccordionHeader = ({ count, label, active, button }) => {

  const icon = (active) ? <Up /> : <Down /> ;
  const countElement = (count !== undefined) ? "(" + count + ")": '' ;


  return (
      <Box direction="row" align="center" justify="between" pad={{horizontal: "medium"}}>
        <Box direction="row" align="center" gap="small">
          {icon}<Heading level={4}>{label} {countElement}</Heading>
        </Box>
        {button}
      </Box>
  )
}

export default AccordionHeader
