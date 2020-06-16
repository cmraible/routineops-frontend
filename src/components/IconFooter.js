import React from 'react';
import { Box, Button, Footer } from 'grommet';
import { Add, Grid, Group, List } from 'grommet-icons';
import { connect } from 'react-redux';
import { logout } from '../actions/actions';
import {
  goToAddTask,
  goToDash,
  goToGrid,
  goToList,
  goToRoles
} from '../actions/ui.actions';

const IconFooter = ({ logout, darkMode, goToAddTask, goToDash, goToGrid, goToList }) => {

  const footerStyle = {
    position: "absolute",
    width: "100%",
    bottom: "0px"
  }
  return (
      <Footer background="black" fill="horizontal" style={footerStyle}>
        <Box align="center" justify="center" fill="horizontal" gap="medium" direction="row" flex>
          <Button icon={<Add />} onClick={() => goToAddTask() } />
          <Button icon={<Group />} onClick={() => goToRoles() } />
          <Button icon={<Grid />} onClick={() => goToGrid() }/>
          <Button icon={<List />} onClick={() => goToList() }/>
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
    goToAddTask: () => {
      dispatch(goToAddTask())
    },
    goToDash: () => {
      dispatch(goToDash())
    },
    goToGrid: () => {
      dispatch(goToGrid())
    },
    goToList: () => {
      dispatch(goToList())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(IconFooter);
