import { Box, Text } from 'grommet';
import React from 'react';
import history from '../history';

const DesktopSidebarItem = ({ href, icon, label, active }) => {

  return (
    <Box
      onClick={() => history.push(href)}
      active={active}
      fill="horizontal"
    >
      <Box
        align="center"
        direction="row"
        gap="medium"
        pad="small"
        background={active ? "dark-1" : "none"}
        round="small"
        fill="horizontal"
      >
        {icon}
        <Text size="large">{label}</Text>
      </Box>
    </Box>
  )
}

export default DesktopSidebarItem;
