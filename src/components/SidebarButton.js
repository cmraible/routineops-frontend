import { Box, Button, Text } from 'grommet';
import React from 'react';


const SidebarButton = ({ onClick, icon, label, active }) => {

  return (
    <Button plain hoverIndicator onClick={onClick} active={active} >
      {({ hover }) => (
      <Box
        align="center"
        pad="small"
        direction="row"
        gap="large"
      >
        {icon}
        <Text size="medium">{label}</Text>
      </Box>
    )}
    </Button>
  )
}

export default SidebarButton;
