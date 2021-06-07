import { Box, Text } from 'grommet';
import React from 'react';
import UserAvatar from './UserAvatar';

const UserItem = ({user}) => {

    return (
        <Box
            fill="horizontal"
            direction="row"
            gap="medium"
            align="center"
        >
            <UserAvatar user={user} />
            <Text>{user.first_name + " " + user.last_name} </Text>
        </Box>
    )
}

export default UserItem;