import React from 'react';
import { Box, Text } from 'grommet';
import { Google } from 'grommet-icons';

const SocialAccountItem = ({socialAccount}) => {

    return (
        <Box
            fill="horizontal"
            direction="row"
            gap="medium"
        >
            <Google color="plain" />
            <Text>{socialAccount.extra_data.email} </Text>
        </Box>
    )
}

export default SocialAccountItem;