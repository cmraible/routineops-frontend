import React from 'react';
import { Anchor, Box, Heading, List } from 'grommet';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllAuthorizedUsers, chooseAccount } from './authSlice';

const SwitchAccounts = () => {

    const dispatch = useDispatch();

    const users = useSelector(selectAllAuthorizedUsers)
    return (
        <Box height="100vh" align="center" justify="center">
            <Box align="center" width="720px" gap="medium">
                <Heading>Switch Accounts</Heading>
                <List 
                    data={users}
                    onClickItem={({item, index}) => {
                        console.log(item)
                        dispatch(chooseAccount(item.user.id));
                    }}
                    children={(item, index) => {
                        return <Box width="512px" align="center">{item.user.email}</Box>
                    }}
                />
                <Anchor href="/login">Add Account</Anchor>
            </Box>
        </Box>
        
    )
}

export default SwitchAccounts;