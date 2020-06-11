import React from 'react';
import { Avatar, Box, Button, Header, Menu } from 'grommet';
import { Link } from 'react-router-dom';
import { Down, User } from 'grommet-icons';

const IconHeader = ({ logout, toggleDarkMode, darkMode }) => {


  return (
      <Header background="black" fill="horizontal" pad="small">
        <Box direction="row">
          <Link to="/organization"><Button color="white" plain>Logo</Button></Link>
        </Box>

        <Box direction="row">

          <Menu
            icon=<Down />
            items={[
              { label: (darkMode) ? "Light" : "Dark" , onClick: () => {toggleDarkMode()} },
              { label: "Logout", onClick: () => {logout()} }
            ]}
          />
          <Link to="/profile">
            <Avatar background="white" round="full">
                <User color="brand"/>
            </Avatar>
          </Link>
        </Box>
      </Header>
  )

};
export default IconHeader;
