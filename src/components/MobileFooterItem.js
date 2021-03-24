import React from 'react';
import { Box, Text } from 'grommet';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const MobileFooterItem = ({label, icon, href, active}) => {
    const dispatch = useDispatch();
    return (
        <Box
            round="medium"
            align="center"
            pad="small"
            width="20%"
            onClick={() => dispatch(push(href))}
            background={active ? "dark-1" : "false"}
        >
            {icon}
            <Text size="small">{label}</Text>
        </Box>
    )
}

export default MobileFooterItem;