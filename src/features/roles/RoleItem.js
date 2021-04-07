import React from 'react';
import { Box, Text } from 'grommet';
import { User } from 'grommet-icons';
import { useSelector } from 'react-redux';
import { selectRoleById } from './rolesSlice';

const RoleItem = ({id}) => {
    const role = useSelector(state => selectRoleById(state, id));
    return (
        <Box direction="row" fill justify="stretch" pad="small">
            <Box direction="row" justify="stretch" align="center" gap="medium">
                <User /><Text>{role.name}</Text>
            </Box>
        </Box>
    )
}

export default RoleItem;