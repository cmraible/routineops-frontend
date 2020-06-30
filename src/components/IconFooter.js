import React from 'react';
import { Box, Button, Footer } from 'grommet';
import { Calendar, Checkmark, Group, Resources } from 'grommet-icons';
import { connect } from 'react-redux';
import {
  goToCalendar,
  goToMatrix,
  goToRoles,
  goToTasks
} from '../actions/ui.actions';

const IconFooter = ({goToTasks, goToCalendar, goToMatrix }) => {

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
          <Button icon={<Calendar />} onClick={() => goToCalendar()} />
        </Box>
      </Footer>
  )

};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  goToTasks: () => {
    dispatch(goToTasks())
  },
  goToCalendar: () => {
    dispatch(goToCalendar())
  },
  goToMatrix: () => {
    dispatch(goToMatrix())
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(IconFooter);
