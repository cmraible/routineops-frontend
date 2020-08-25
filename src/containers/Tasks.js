import { Box, Form, List, Text } from 'grommet';
import { Checkmark } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getRoles } from '../actions/role.actions';
import { addTask, deleteTask, getTask, getTasks } from '../actions/task.actions';
import { goToTask } from '../actions/ui.actions';
import { getAllRoles, getAllTasks, getLoggedInUser, getAllTaskLayers } from '../reducers/reducers';
import SplitPage from '../components/SplitPage';
import Task from './Task';
import InlineInput from '../components/InlineInput';
import { getTaskLayers } from '../actions/taskLayer.actions';


const Tasks = ({ match, tasksById, organization, tasks, addTask, getTasks, getRoles, roles, isFetching, errors, getTaskLayers, taskLayers }) => {

  const task_id = match.params.task_id;

  const [value, setValue] = useState({
    organization: organization.id,
    name: '',
    checks: [
      {prompt: '', resultType: 'BOOLEAN', organization: organization.id}
    ]
  });

  useEffect(() => {
    getTasks();
    getRoles();
    getTaskLayers();
  }, [getTasks, getRoles, getTaskLayers]);

  const renderChildren = (task, index) => {
    const count = taskLayers.filter(layer => layer.task === task.id).length
    return (
      <Box direction="row" align="center" justify="between">
        <Box direction="row" align="center" gap="medium">
          <Checkmark /><Text>{task.name}</Text>
        </Box>
        <Text>{count}</Text>
      </Box>
      
    )
  }

  const [selected, setSelected] = React.useState(tasks.findIndex((task) => task.id === task_id ));

  const handleSubmit = ({value}) => {
    addTask({
      organization: organization.id,
      name: value.name,
      checks: [
        {prompt: `Did you ${value.name.toLowerCase()}?`, resultType: 'BOOLEAN', organization: organization.id}
      ]
    });
    setValue({name: ''});
  }

  const detailView = (props) => {
    return (task_id &&
      <Task task={tasksById[task_id]} />
    )
  }

  return (
    <SplitPage title="Tasks" detailView={detailView}>
      <Box flex={false}>
        <Box direction="column" margin={{top: "medium"}} width="large" gap="medium">
          <Form
            onSubmit={handleSubmit}
            value={value}
            onChange={ nextValue => setValue(nextValue) }
          >
            <InlineInput required name="name" placeholder="Type here and hit Enter to create a new task" />
          </Form>
          <List
            primaryKey="name"
            data={tasks}
            itemProps={
              selected >= 0 ? { [selected]: { background: 'brand' } } : undefined
            }
            children={renderChildren}
            onClickItem={(event) => {
              goToTask(event.item.id);
              setSelected(selected === event.index ? undefined : event.index);
            }}
          />
        </Box>
      </Box>
    </SplitPage>
  )

};

const mapStateToProps = state => ({
  organization: state.organization.organization,
  user: getLoggedInUser(state),
  tasks: getAllTasks(state),
  tasksById: state.tasks.byId,
  taskLayers: getAllTaskLayers(state),
  roles: getAllRoles(state),
  isFetching: state.tasks.isFetching,
  errors: state.tasks.errors
});

export default connect(mapStateToProps, {
  addTask, 
  getTasks, 
  getTask, 
  deleteTask, 
  getRoles,
  getTaskLayers
})(Tasks);
