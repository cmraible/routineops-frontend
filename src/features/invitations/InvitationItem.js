import { Box, Button, Text } from 'grommet';
import { MailOption, Trash } from 'grommet-icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteInvitation } from '../invitations/invitationsSlice';

const InvitationItem = ({invitation}) => {

    const dispatch = useDispatch();


    const handleSubmit = async () => {
        await dispatch(deleteInvitation(invitation.uuid));
    }

    return (
        <Box
            fill="horizontal"
            direction="row"
            gap="medium"
            align="center"
            justify="between"
        >
            <Box direction="row" gap="medium">
                <MailOption />
                <Text>{invitation.email_address}</Text>
            </Box>
            <Button icon={<Trash size="small" />} onClick={handleSubmit} />
            
        </Box>
    )
}

export default InvitationItem;