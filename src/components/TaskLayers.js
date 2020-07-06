import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Box, Heading, List, Main, Select, Text } from 'grommet';
import { Clock } from 'grommet-icons';
import { rrulestr } from 'rrule';
import TaskLayerOverlay from './TaskLayerOverlay';
import { getRoles } from '../actions/role.actions';
import { getTasks } from '../actions/task.actions';
import { getTaskLayers, addTaskLayer, saveTaskLayer, deleteTaskLayer } from '../actions/taskLayer.actions';
import { getAllRoles, getAllTasks, getAllTaskLayers } from '../reducers/reducers';

const TaskLayers = ({
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
  }, [getTasks, getRoles, getTaskLayers, organization.id]);

  const [chosenRole, setChosenRole] = useState(roles[0])

  const [openLayer, setOpenLayer] = useState()

  const onOpenLayer = (event) => setOpenLayer(event.item);

  const onCloseLayer = () => setOpenLayer(undefined);

  const renderChildren = (datum, index) => {
    const layer = datum.taskLayer
    const task = datum.task
    const rule = (layer) ? rrulestr(layer.recurrence) : undefined
    const recurrence_text = (rule) ? rule.toText() : '';
    return (
      <Box justify="between" direction="row">
        <Box direction="row" align="center" gap="medium">
          <Clock /><Text>{task.name}</Text>
        </Box>
        {(layer && <Text>{recurrence_text}</Text> )}
      </Box>
      
    )
  }

  const listData = tasks.map((task) => {
    const layer = taskLayers.find((layer) => layer.role === chosenRole.id && layer.task === task.id)
    return {
      task: task,
      taskLayer: layer
    }
  })

  return (
    <Main fill="horizontal" margin={{bottom:"large"}} pad="medium" >
      <Box gap="medium">
      <Box direction="row" gap="medium">
        <Heading>Schedule for</Heading>
        <Select 
          plain={true}
          name="role"
          options={roles}
          placeholder="Role"
          size="large" 
          labelKey="name"
          value={chosenRole}
          onChange={({option}) => setChosenRole(option)}
          valueKey={{
            key: "id"
          }}
          valueLabel={<Heading>{(chosenRole) ? chosenRole.name : ''}</Heading>}
        />
      </Box>
        <List
            primaryKey="name"
            data={listData}
            children={renderChildren}
            onClickItem={onOpenLayer}
        />
        
      </Box>
      {
          openLayer && (
            <TaskLayerOverlay layer={openLayer} onClose={onOpenLayer} role={chosenRole} />
          )
      }
    </Main>
  )

};

const mapStateToProps = state => ({
  organization: state.organization,
  user: state.user,
  tasks: getAllTasks(state),
  taskLayers: getAllTaskLayers(state),
  roles: getAllRoles(state)
});

const mapDispatchToProps = dispatch => ({
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
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskLayers);
