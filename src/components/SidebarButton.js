import React from 'react';
import { Box, Button, Text } from 'grommet';


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
