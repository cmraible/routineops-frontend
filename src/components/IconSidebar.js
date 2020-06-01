import React from 'react';
import { Avatar, Box, Button, Sidebar } from 'grommet';
import { Link, NavLink } from 'react-router-dom';
import { Add, Dashboard, Grid, List, Logout, User } from 'grommet-icons';
import { logout } from '../api.js';


const IconSidebar = () => {

  return (
      <Sidebar align="start" background="brand" fill="vertical" gap="large" justify="between">
        <Box align="center" justify="center" gap="medium">
          <Button as={Link} plain="true" color="white" to="/organization">Logo</Button>
          <Link to="/profile">
          <Avatar background="white" round="full">

              <User color="brand"/>
          </Avatar>
          </Link>

        </Box>
        <Box align="center" flex="true" justify="center" gap="small">
          <Button icon={<Add />} as={NavLink} to="/add" />
          <Button icon={<Dashboard />} as={NavLink} to="/dash" />
          <Button icon={<Grid />} as={NavLink} to="/grid" />
          <Button icon={<List />} as={NavLink} to="/list" />
        </Box>
        <Box align="center" flex="true" justify="end">
            <Button icon={<Logout />} onClick={() => logout()} />
        </Box>
      </Sidebar>
  )

};
export default IconSidebar;
