import React from 'react';
import { Box, Button, Footer } from 'grommet';
import { NavLink } from 'react-router-dom';
import { Add, Dashboard, Grid, List } from 'grommet-icons';
import { connect } from 'react-redux';
import { toggleDarkMode, logout } from '../actions/actions';

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

const mapStateToProps = state => {
  return {
    darkMode: state.darkMode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleDarkMode: () => {
      dispatch(toggleDarkMode())
    },
    logout: () => {
      dispatch(logout())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(IconFooter);
