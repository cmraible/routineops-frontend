import React from 'react';
import { Box, Text } from 'grommet';
import { User } from 'grommet-icons';

const SocialAccountItem = ({user}) => {

    return (
        <Box
            fill="horizontal"
            direction="row"
            gap="medium"
        >
            <User />
            <Text>{user.first_name + " " + user.last_name} </Text>
        </Box>
    )
}

export default SocialAccountItem;