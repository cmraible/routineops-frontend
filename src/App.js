import React from 'react';
import { Box, Button, Nav, Sidebar } from 'grommet';
import { Logout } from 'grommet-icons';
import { logout } from './api.js'


const App = () => {

  return (
    <Box direction="row-responsive">
      <Sidebar background="brand" direction="column" fill="vertical">
        <Nav gap="small">
          <Button icon={<Logout />} onClick={() => logout()} />
        </Nav>
      </Sidebar>
    </Box>
  )

};
export default App;
