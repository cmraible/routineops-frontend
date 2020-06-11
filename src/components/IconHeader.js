import React from 'react';
import { Avatar, Box, Button, Header } from 'grommet';
import { Link, NavLink } from 'react-router-dom';
import { Add, Dashboard, Grid, List, Logout, User, View } from 'grommet-icons';

const IconHeader = ({ logout, toggleDarkMode, darkMode }) => {


  return (
      <Header background="black" fill="horizontal" pad="small">
        <Box direction="row">
          <Link to="/organization"><Button color="white" plain>Logo</Button></Link>
        </Box>
        
        <Link to="/profile">
          <Avatar background="white" round="full">
              <User color="brand"/>
          </Avatar>
        </Link>
      </Header>
  )

};
export default IconHeader;
