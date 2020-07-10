import { Box, Main } from 'grommet';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRoles } from '../actions/role.actions';
import { getTask } from '../actions/task.actions';
import { getTaskLayers } from '../actions/taskLayer.actions';
import { goToRoles } from '../actions/ui.actions';
import { getAllTaskLayers } from '../reducers/reducers';
import BackButton from './BackButton';
import RoleForm from './RoleForm';


const Role = ({ match, getRoles, getTaskLayers, rolesById, isFetching }) => {

  const role_id = match.params.role_id
  const role = rolesById[role_id]

  useEffect(() => {
    getTaskLayers()
    getRoles()
  }, [getTaskLayers, getRoles]);

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
  taskLayers: getAllTaskLayers(state),
  isFetching: state.roles.isFetching
})

export default connect(mapStateToProps, {
  getTask,
  getTaskLayers,
  getRoles
})(Role)
