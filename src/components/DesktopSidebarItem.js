import { Box, Text } from 'grommet';
import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const DesktopSidebarItem = ({ href, icon, label, active }) => {

  const dispatch = useDispatch();

  return (
      <Box
        onClick={() => dispatch(push(href))}

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
  )
}

export default DesktopSidebarItem;
