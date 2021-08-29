import { push } from 'connected-react-router';
import { Box, Menu, Text } from 'grommet';
import { ContactInfo, Logout, Transaction } from 'grommet-icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectLoggedInUser, switchAccounts } from '../auth/authSlice';
import UserAvatar from './UserAvatar';

const UserMenu = ({ mobile }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser);

  const logoutAction = () => {
    dispatch(push('/'));
    dispatch(logout())
  }

  const items = [
    {label: 'My Profile', icon: <ContactInfo />, gap: "large", round: "medium", onClick: () => dispatch(push('/profile'))},
    {label: 'Switch Accounts', icon: <Transaction />, gap: "large", round: "medium", onClick: () => {
      dispatch(switchAccounts());
      dispatch(push('/'));
    }},
    {label: 'Logout', icon: <Logout />, gap: "large", round: "medium", onClick: () => logoutAction()}
  ]

  if (!mobile) {
    return (
      <Menu
        items={items}
        plain
        dropBackground="brand"
        dropProps={{elevation: "none", round: "small"}}
        dropAlign={{"top": "bottom", "left": "left"}}
        size="small"
      >
        { () => (
          <Box
            align="center"
            direction="row"
            background="black"
            gap="medium"
            pad="small"
            round="small"
            fill="horizontal"
          >
            <UserAvatar id={user.id} />
            <Text size="large">{(user.first_name && user.last_name) ? user.first_name + ' ' + user.last_name : user.email}</Text>
          </Box>
        )
        }
  
        </Menu>
    )
  } else {
    return (
      <Menu
        items={items}
        plain
        dropBackground="brand"
        dropProps={{elevation: "none", round: "small"}}
        dropAlign={{"top": "bottom", "left": "left"}}
        size="small"
      >
        { () => (
          <Box
            align="center"
            direction="row"
            background="black"
            pad="small"
            round="small"
          >
            <UserAvatar size="small" id={user.id} />
          </Box>
        )
        }
  
        </Menu>
    )
  }
  
};

export default UserMenu;
