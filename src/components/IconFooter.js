import React from 'react';
import { Box, Button, Footer } from 'grommet';
import { NavLink } from 'react-router-dom';
import { Add, Dashboard, Grid, List } from 'grommet-icons';

const IconFooter = ({ logout, toggleDarkMode, darkMode }) => {

  const footerStyle = {
    position: "absolute",
    width: "100%",
    bottom: "0px"
  }
  return (
      <Footer background="black" fill="horizontal" style={footerStyle}>
        <Box align="center" justify="center" fill="horizontal" gap="medium" direction="row" flex>
          <NavLink to="/add"><Button icon={<Add />} /></NavLink>
          <NavLink to="/dash"><Button icon={<Dashboard />} /></NavLink>
          <NavLink to="/grid"><Button icon={<Grid />} /></NavLink>
          <NavLink to="/list"><Button icon={<List />} /></NavLink>
        </Box>
      </Footer>
  )

};
export default IconFooter;
