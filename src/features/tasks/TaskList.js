import { Box, Button, Menu, Text } from 'grommet';
import { Add, Checkmark, CircleInformation, Edit, More, Trash } from 'grommet-icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListView from '../../components/ListView';
import Spinner from '../../components/Spinner';
import history from '../../history';
import { deleteTask, fetchTasks, selectAllTasks, selectTaskById } from './tasksSlice';

const TaskExcerpt = ({id}) => {
  const task = useSelector(state => selectTaskById(state, id));
  return (
    <Box align="start" pad="small" onClick={() => history.push(`/tasks/${id}`)}>
      <Box direction="row" align="center" gap="medium">
        <Checkmark /><Text>{task.name}</Text>
      </Box>
    </Box>
  )
}

const TaskActions = ({ id }) => {
  const dispatch = useDispatch();

  const [requestStatus, setRequestStatus] = useState('idle');

  const handleDelete = async (id) => {
    setRequestStatus('pending');
    const resultAction = await dispatch(deleteTask(id))
    if (!deleteTask.fulfilled.match(resultAction)) {
      setRequestStatus('failed');
      console.log(resultAction.error.message)
    }
  }

  return (
    <Menu
      icon={(requestStatus === 'pending')? <Box pad="small"><Spinner isFetching={true} size="small" /></Box> : <Box pad="small"><More size="small" /></Box>}
      id={`action-menu-${id}`}
      dropAlign={{top: 'top', right: 'right'}}
      justifyContent="end"
      items={[
        { justify: 'center', gap: 'medium', icon: <Box pad="small"><Edit size="small" /></Box>, label: 'Edit', onClick: () => {history.push(`/tasks/${id}/edit`)}},
        { justify: 'center', gap: 'medium', icon: <Box pad="small"><Trash size="small" /></Box>, label: 'Delete', onClick: () => {handleDelete(id)}},
      ]}
    />
  )
}


const TaskList = () => {

  return (
    <ListView
      title="Tasks"
      action={{
        icon: <Add />,
        onClick: () => history.push('/tasks/add'),
        label: "Add Task"
      }}
      itemSelector={selectAllTasks}
      fetchAction={fetchTasks}
      renderItem={(task) => (<TaskExcerpt id={task.id} key={task.id} />)}
      listActions={(item) => (<TaskActions key={item.id} id={item.id} />)}
      empty={(
        <Box gap="medium" align="center">
            <CircleInformation />
          <Text size="large">You don't have any tasks yet.</Text>
          <Button size="large" icon={<Add/>} label="Add Task" onClick={() => history.push('/tasks/add')} />
        </Box>
      )}
    />
  )
};

export default TaskList;
