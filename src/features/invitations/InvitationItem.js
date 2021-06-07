import { Box, Text } from 'grommet';
import React from 'react';
import { MailOption } from 'grommet-icons';

const InvitationItem = ({invitation}) => {

    return (
        <Box
            fill="horizontal"
            direction="row"
            gap="medium"
            align="center"
        >
            <MailOption />
            <Text>{invitation.email_address}</Text>
        </Box>
    )
}

export default InvitationItem;