import { goBack, push } from 'connected-react-router';
import { Box, Heading, Paragraph, Text } from 'grommet';
import { Edit } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/Error';
import Page from '../../components/Page';
import Spinner from '../../components/Spinner';
import { flattenErrors } from '../../utils';
import { fetchRoles, selectRoleEntities } from '../roles/rolesSlice';
import { fetchTaskLayers, selectTaskLayersForTask } from '../taskLayers/taskLayersSlice';
import { fetchTask, selectTaskById } from './tasksSlice';


const TaskDetail = ({ match }) => {
  const dispatch = useDispatch()
  const { taskId } = match.params;

  const task = useSelector(state => selectTaskById(state, taskId));
  const taskLayers = useSelector(state => selectTaskLayersForTask(state, taskId))
  const roles = useSelector(selectRoleEntities);

  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetch = async () => {
      setStatus('pending');
      setErrors({});
      const taskAction = await dispatch(fetchTask(taskId));
      const roleAction = await dispatch(fetchRoles());
      const taskLayerAction = await dispatch(fetchTaskLayers());
      if (fetchTask.fulfilled.match(taskAction) && fetchRoles.fulfilled.match(roleAction) && taskLayerAction.fulfilled.match(taskLayerAction)) {
          setStatus('succeeded');
      } else {
          setStatus('failed');
          if (taskAction.payload) {
            setErrors(flattenErrors(taskAction.payload))
          } else if (roleAction.payload) {
            setErrors(flattenErrors(roleAction.payload))
          } else if (taskLayerAction.payload) {
            setErrors(flattenErrors(taskLayerAction.payload))
          } else if (taskAction.error) {
            setErrors({'non_field_errors': taskAction.error.message})
          } else if (roleAction.error) {
            setErrors({'non_field_errors': roleAction.error.message})
          } else if (taskLayerAction.error) {
            setErrors({'non_field_errors': taskLayerAction.error.message})
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
    var layers = []
    taskLayers.forEach((layer) => {
      const role = roles[layer.role]
      layers.push(
          <Box gap="medium" pad={{vertical: "medium"}} key={layer.id}>
            <Text>Assigned to {role.name}</Text>
            <Text>Repeats {task.layers[0].label}</Text>
          </Box>
      )
    })
    content = (
      <Box pad="medium">
        <Box border="bottom">
          <Heading margin="none">{task.name}</Heading>
          <Paragraph level={2} color="text-xweak">{task.description}</Paragraph>
        </Box>
        {layers}
      </Box>
    )
  } else if (status === 'failed') {
    content = (
      <Error message={(errors && errors['non_field_errors']) ? errors['non_field_errors'] : undefined} />
    )
  }

  return (
    <Page
      title="Task"
      action={{
        icon: <Edit />,
        onClick: () => dispatch(push(`/tasks/${taskId}/edit`)),
        label: "Edit Task"
      }}
      previous={() => dispatch(goBack())}
    >
      {content}
    </Page>
  )
};

export default TaskDetail;
