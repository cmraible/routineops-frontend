import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Heading, Main } from 'grommet';
import { getTask } from '../actions/task.actions';
import { goToRoles } from '../actions/ui.actions';
import { getTaskLayers } from '../actions/taskLayer.actions';
import { getAllTaskLayers } from '../reducers/reducers';
import BackButton from './BackButton';
import { getRoles } from '../actions/role.actions';
import RoleForm from './RoleForm';


const Role = ({ match, tasksById, getTask, getRoles, getTaskLayers, rolesById, isFetching }) => {

  const role_id = match.params.role_id
  const role = rolesById[role_id]

  useEffect(() => {
    getTaskLayers()
    getRoles()
  }, [getTask]);

  return (
        <Main pad="medium">
          <Box flex={false}>
            <BackButton onClick={goToRoles} label="Roles" />
            <RoleForm role={role} isFetching={isFetching} />
          </Box>   
     
        </Main>
  )

};

const mapStateToProps = (state) => ({
  rolesById: state.roles.byId,
  tasksById: state.tasks.byId,
  taskLayers: getAllTaskLayers(state),
  isFetching: state.roles.isFetching
})

export default connect(mapStateToProps, {
  getTask,
  getTaskLayers,
  getRoles
})(Role)
