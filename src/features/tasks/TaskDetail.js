import { Box, Heading, Paragraph, Text } from 'grommet';
import { Edit } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/Error';
import Page from '../../components/Page';
import Spinner from '../../components/Spinner';
import history from '../../history';
import { flattenErrors } from '../../utils';
import { fetchRoles, selectRoleById } from '../roles/rolesSlice';
import { fetchTask, selectTaskById } from './tasksSlice';

const TaskDetail = ({ match, taskLayers }) => {
  const dispatch = useDispatch()
  const { taskId } = match.params;

  const task = useSelector(state => selectTaskById(state, taskId));
  const layer = (task) ? task.layers[0] : {role: {name: ''}}
  const role = useSelector(state => selectRoleById(state, layer.role));

  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetch = async () => {
      setStatus('pending');
      setErrors({});
      const taskAction = await dispatch(fetchTask(taskId));
      const roleAction = await dispatch(fetchRoles());
      if (fetchTask.fulfilled.match(taskAction) && fetchRoles.fulfilled.match(roleAction)) {
          setStatus('succeeded');
      } else {
          setStatus('failed');
          if (taskAction.payload) {
            setErrors(flattenErrors(taskAction.payload))
          } else if (roleAction.payload) {
            setErrors(flattenErrors(roleAction.payload))
          } else if (taskAction.error) {
            setErrors({'non_field_errors': taskAction.error.message})
          } else if (roleAction.error) {
            setErrors({'non_field_errors': roleAction.error.message})
          } else {
            setErrors({'non_field_errors': 'Unable to fetch task.'})
          }
      }
    }
    fetch();
  }, [dispatch, taskId]);

  let content

  if (status === 'pending') {
    content = (<Spinner pad="large" size="large" color="status-unknown" />)
  } else if (status === 'succeeded') {
    console.log(role)
    console.log(task)
    content = (
      <React.Fragment>
        <Box border="bottom">
          <Heading margin="none">{task.name}</Heading>
          <Paragraph level={2} color="text-xweak">{task.description}</Paragraph>
        </Box>
        <Box gap="medium" pad={{vertical: "medium"}}>
          <Text>Assigned to {role.name}</Text>
          <Text>Repeats {task.layers[0].label}</Text>
        </Box>
      </React.Fragment>
    )
  } else if (status === 'failed') {
    content = (
      <Error message={(errors && errors['non_field_errors']) ? errors['non_field_errors'] : undefined} />
    )
  }

  return (
    <Page
      pad="small"
      title="Task"
      action={{
        icon: <Edit />,
        onClick: () => history.push(`/tasks/${taskId}/edit`),
        label: "Edit Task"
      }}
      previous="/tasks" >
      {content}
    </Page>
  )
};

export default TaskDetail;
