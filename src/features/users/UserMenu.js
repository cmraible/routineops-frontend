import { Avatar, Box, Menu, Text } from 'grommet';
import { User, Logout } from 'grommet-icons';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser } from '../auth/authSlice';
import { logout } from '../auth/authSlice';
import history from '../../history';


const UserMenu = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser);

  const logoutAction = () => {
    history.push('/')
    dispatch(logout())
  }


  return (
    <Menu
      items={[
        {label: 'Logout', icon: <Logout />, gap: "large", round: "medium", onClick: () => logoutAction()}
      ]}
      plain
      dropBackground="brand"
      dropProps={{elevation: "none", round: "13px"}}
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
          fill="horizontal"
        >
          <Avatar size="36px" background="white">
            <User />
          </Avatar>
          <Text size="large">{user.first_name + ' ' + user.last_name}</Text>
        </Box>
      )

      }

      </Menu>
  )
};

export default UserMenu;
