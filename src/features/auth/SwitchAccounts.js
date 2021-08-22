import { Anchor, Box, List } from 'grommet';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccountPage from '../../components/AccountPage';
import UserAvatar from '../users/UserAvatar';
import { chooseAccount, selectAllAuthorizedUsers } from './authSlice';

const SwitchAccounts = () => {

    const dispatch = useDispatch();

    const users = useSelector(selectAllAuthorizedUsers)
    return (
        <AccountPage title="Accounts">
            <Box flex={false} gap="large" fill="horizontal">
                <List 
                    data={users}
                    onClickItem={({item, index}) => {
                        console.log(item)
                        dispatch(chooseAccount(item.user.id));
                    }}
                    children={(item, index) => {
                        return (
                            <Box gap="medium" width="512px" align="center" direction="row">
                                <UserAvatar id={item.user.id} />{item.user.email}
                            </Box>
                        )
                            
                    }}
                />
                <Box direction="row" justify="center" gap="small">
                    <Anchor href="/login">Add account</Anchor>
                </Box>
            </Box>

        </AccountPage>
        
        
    )
}

export default SwitchAccounts;