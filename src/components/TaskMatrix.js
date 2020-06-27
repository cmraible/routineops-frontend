import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, DataTable, Heading, Main, Text, Select } from 'grommet';
import { RRule } from 'rrule';
import TaskLayerForm from './TaskLayerForm';
import { getRoles } from '../actions/role.actions';
import { getTasks } from '../actions/task.actions';
import { getTaskLayers, addTaskLayer, saveTaskLayer, deleteTaskLayer } from '../actions/taskLayer.actions';


const TaskMatrix = ({
  organization,
  tasks,
  roles,
  taskLayers,
  getTasks,
  getRoles,
  getTaskLayers,
  addTaskLayer,
  saveTaskLayer,
  deleteTaskLayer
 }) => {

  useEffect(() => {
    getTasks(organization.id)
    getRoles(organization.id)
    getTaskLayers(organization.id)
  }, []);

  const roleColumns = roles.map((role) => {
    return {
      align: 'center',
      property: 'role' + role.id,
      header: <Text>{role.name}</Text>,
      render: datum => {
        const taskLayer = taskLayers.find((taskLayer) => taskLayer.role === role.id && taskLayer.task === datum.id )
        return (
          <TaskLayerForm
            organization={organization}
            role={role}
            task={datum}
            taskLayer={taskLayer}
            saveFunction={saveTaskLayer}
            addFunction={addTaskLayer}
            deleteFunction={deleteTaskLayer}
          />
        )
      }
    }
  })

  const columns = [
    {
      align: 'start',
      property: 'Task',
      header: <Text>Task</Text>,
      render: datum => (<Text>{datum.name}</Text>)
    },
    ...roleColumns
  ]

  return (
    <Main pad="medium">
      <Heading>Assign tasks to roles</Heading>
      <DataTable
        columns={columns}
        data={tasks}
        border={true}
      />
    </Main>
  )

};

const mapStateToProps = state => {
  return {
    organization: state.organization,
    user: state.user,
    tasks: state.tasks,
    taskLayers: state.taskLayers,
    roles: state.roles
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTasks: (organization_id) => {
      dispatch(getTasks(organization_id))
    },
    getRoles: (organization_id) => {
      dispatch(getRoles(organization_id))
    },
    getTaskLayers: (organization_id) => {
      dispatch(getTaskLayers(organization_id))
    },
    addTaskLayer: (taskLayer) => {
      dispatch(addTaskLayer(taskLayer))
    },
    saveTaskLayer: (taskLayer) => {
      dispatch(saveTaskLayer(taskLayer))
    },
    deleteTaskLayer: (taskLayer) => {
      dispatch(deleteTaskLayer(taskLayer))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskMatrix);
