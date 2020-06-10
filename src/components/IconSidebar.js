import React from 'react';
import { Avatar, Box, Button, Sidebar } from 'grommet';
import { Link, NavLink } from 'react-router-dom';
import { Actions, Add, Dashboard, Grid, List, Logout, User } from 'grommet-icons';

const IconSidebar = ({ logout, toggleDarkMode }) => {


  return (
      <Sidebar align="start" background="brand" fill="vertical" gap="large" justify="between">
        <Box align="center" justify="center" gap="medium">
          <Button as={Link} color="white" plain to="/organization">Logo</Button>
          <Link to="/profile">
          <Avatar background="white" round="full">

              <User color="brand"/>
          </Avatar>
          </Link>
        </Box>
        <Box align="center" flex justify="center" gap="small">
          <NavLink to="/add"><Button icon={<Add />} /></NavLink>
          <NavLink to="/dash"><Button icon={<Dashboard />} /></NavLink>
          <NavLink to="/grid"><Button icon={<Grid />} /></NavLink>
          <NavLink to="/list"><Button icon={<List />} /></NavLink>
        </Box>
        <Box align="center" flex justify="end">
          <Button icon={<Actions />} onClick={() => toggleDarkMode()} />
          <Button icon={<Logout />} onClick={() => logout()} />
        </Box>
      </Sidebar>
  )

};
export default IconSidebar;
