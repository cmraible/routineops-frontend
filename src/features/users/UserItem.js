import { push } from 'connected-react-router';
import { Box, Button, Text } from 'grommet';
import { Trash, Share, Revert } from 'grommet-icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from '../auth/authSlice';
import UserAvatar from './UserAvatar';
import { selectUserById, updateUser } from './usersSlice';


const UserItem = ({id}) => {

    const dispatch = useDispatch()
    const user = useSelector(state => selectUserById(state, id));
    const loggedInUser = useSelector(selectLoggedInUser)

    return (
        <Box
            fill="horizontal"
            direction="row"
            align="center"
            justify="between"
        >
            <Box direction="row" gap="medium" align="center">
                {<UserAvatar id={id} /> }
                <Text>{`${user.first_name} ${user.last_name}`} </Text>
            </Box>
            <Box direction="row" gap="medium">
                {loggedInUser.id !== user.id && loggedInUser.is_account_admin && user.is_active && (
                        <Button 
                            tip={{content: <Text>Deactivate user</Text>}}
                            icon={<Trash size="small" />} 
                            onClick={() => {
                                dispatch(updateUser({id: id, is_active: false}))
                            }}
                        />
                )}
                {loggedInUser.id !== user.id && loggedInUser.is_account_admin && user.is_active === false && (
                        <Button
                        tip={{content: <Text>Reactivate user</Text>}}
                        icon={<Revert size="small" />} 
                            onClick={() => {
                                dispatch(updateUser({id: id, is_active: true}))
                            }}
                        />
                )}
                <Button 
                    icon={<Share size="small" />} 
                    onClick={() => dispatch(push(`/users/${id}`))}                             
                    tip={{content: <Text>Go to user</Text>}}
                />
            </Box>
        </Box>
    )
}

export default UserItem;