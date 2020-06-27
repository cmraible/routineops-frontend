import React from 'react';
import { Box, Button, Footer } from 'grommet';
import { Checkmark, Grid, Group, Resources } from 'grommet-icons';
import { connect } from 'react-redux';
import { logout } from '../actions/auth.actions';
import {
  goToDash,
  goToGrid,
  goToList,
  goToMatrix,
  goToRoles,
  goToTasks
} from '../actions/ui.actions';

const IconFooter = ({ logout, darkMode, goToTasks, goToDash, goToGrid, goToList, goToMatrix }) => {

  const footerStyle = {
    position: "absolute",
    width: "100%",
    bottom: "0px"
  }
  return (
      <Footer background="black" fill="horizontal" style={footerStyle}>
        <Box align="center" justify="center" fill="horizontal" gap="medium" direction="row" flex>
          <Button icon={<Group />} onClick={() => goToRoles() } />
          <Button icon={<Checkmark />} onClick={() => goToTasks() } />
          <Button icon={<Resources />} onClick={() => goToMatrix()} />
          <Button icon={<Grid />} onClick={() => goToGrid()} />
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
    logout: () => {
      dispatch(logout())
    },
    goToTasks: () => {
      dispatch(goToTasks())
    },
    goToDash: () => {
      dispatch(goToDash())
    },
    goToGrid: () => {
      dispatch(goToGrid())
    },
    goToList: () => {
      dispatch(goToList())
    },
    goToMatrix: () => {
      dispatch(goToMatrix())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(IconFooter);
