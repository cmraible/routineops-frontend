import { Box, Button, Footer } from 'grommet';
import { Calendar, Checkmark, Clock, Group, Task } from 'grommet-icons';
import React from 'react';
import { connect } from 'react-redux';
import {
  goToCalendar,
  goToHome,
  goToLayers,
  goToRoles,
  goToTasks
} from '../actions/ui.actions';
import { getTaskInstancesForAssignee } from '../reducers/reducers';

const IconFooter = ({goToTasks, goToCalendar, goToHome, tasks, roles, instancesAssigned, taskLayers }) => {

  const rolesExist = (roles.length > 0)
  const instancesExist = (instancesAssigned.length > 0)
  const layersExist = (taskLayers.length > 0)
  
  const homeVisible = (instancesExist)
  const tasksVisible = (rolesExist)
  const calendarVisible = (layersExist)

  const footerStyle = {
    position: "absolute",
    width: "100%",
    bottom: "0px"
  }

  return (
      <Footer background="black" fill="horizontal" style={footerStyle}>
        <Box align="center" justify="center" fill="horizontal" gap="medium" direction="row" flex>
          {homeVisible && <Button icon={<Task />} onClick={() => goToHome() } /> }
          {/* <Button icon={<SettingsOption />} onClick={() => goToSettings() } /> */}
          <Button icon={<Group />} onClick={() => goToRoles() } />
          {tasksVisible && <Button icon={<Checkmark />} onClick={() => goToTasks() } /> }
          {/* <Button icon={<Clock />} onClick={() => goToLayers()} /> */}
          {calendarVisible && <Button icon={<Calendar />} onClick={() => goToCalendar()} />}
        </Box>
      </Footer>
  )
};

const mapStateToProps = state => ({
  roles: state.roles.allIds,
  tasks: state.tasks.allIds,
  instancesAssigned: getTaskInstancesForAssignee(state),
  taskLayers: state.taskLayers.allIds
});

export default connect(mapStateToProps, {
  goToTasks,
  goToCalendar,
  goToLayers,
  goToHome
})(IconFooter);
