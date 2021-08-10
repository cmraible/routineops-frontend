import { Box, Text } from 'grommet';
import React from 'react';
import UserAvatar from './UserAvatar';
import { useSelector } from 'react-redux';
import { selectUserById } from './usersSlice';

const UserItem = ({id}) => {
    console.log(id)

    const user = useSelector(state => selectUserById(state, id));
    console.log(user)

    return (
        <Box
            fill="horizontal"
            direction="row"
            gap="medium"
            align="center"
        >
            {<UserAvatar id={id} /> }
            <Text>{`${user.first_name} ${user.last_name}`} </Text>
        </Box>
    )
}

export default UserItem;