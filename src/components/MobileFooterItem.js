import React from 'react';
import { Box, Text } from 'grommet';
import history from '../history';

const MobileFooterItem = ({label, icon, href, active}) => {
    return (
        <Box
            round="medium"
            align="center"
            pad="small"
            width="20%"
            onClick={() => history.push(href)}
            background={active ? "dark-1" : "false"}
        >
            {icon}
            <Text size="small">{label}</Text>
        </Box>
    )
}

export default MobileFooterItem;