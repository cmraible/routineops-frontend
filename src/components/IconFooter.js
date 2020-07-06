import { Box, Button, Footer } from 'grommet';
import { Calendar, Checkmark, Clock, Group, Home } from 'grommet-icons';
import React from 'react';
import { connect } from 'react-redux';
import {
  goToCalendar,
  goToHome,
  goToLayers,
  goToRoles,
  goToTasks
} from '../actions/ui.actions';

const IconFooter = ({goToTasks, goToCalendar, goToLayers }) => {

  const footerStyle = {
    position: "absolute",
    width: "100%",
    bottom: "0px"
  }
  return (
      <Footer background="black" fill="horizontal" style={footerStyle}>
        <Box align="center" justify="center" fill="horizontal" gap="medium" direction="row" flex>
          <Button icon={<Home />} onClick={() => goToHome() } />
          {/* <Button icon={<SettingsOption />} onClick={() => goToSettings() } /> */}
          <Button icon={<Group />} onClick={() => goToRoles() } />
          <Button icon={<Checkmark />} onClick={() => goToTasks() } />
          <Button icon={<Clock />} onClick={() => goToLayers()} />
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
  goToLayers: () => {
    dispatch(goToLayers())
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(IconFooter);
