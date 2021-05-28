import { goBack, push } from 'connected-react-router';
import { Box, Heading, Paragraph, Text } from 'grommet';
import { Edit } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/Error';
import Page from '../../components/Page';
import Spinner from '../../components/Spinner';
import { flattenErrors } from '../../utils';
import { selectUserAccount } from '../accounts/accountsSlice';
import { fetchRoles, selectRoleEntities } from '../roles/rolesSlice';
import { fetchLayers, selectLayersForRoutine } from '../layers/layersSlice';
import { fetchRoutine, selectRoutineById } from './routinesSlice';


const RoutineDetail = ({ match }) => {
  const dispatch = useDispatch()
  const { routineId } = match.params;

  const account = useSelector(selectUserAccount)
  const routine = useSelector(state => selectRoutineById(state, routineId));
  const layers = useSelector(state => selectLayersForRoutine(state, routineId))
  console.log(layers)
  const roles = useSelector(selectRoleEntities);

  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetch = async () => {
      setStatus('pending');
      setErrors({});
      const routineAction = await dispatch(fetchRoutine(routineId));
      const roleAction = await dispatch(fetchRoles());
      const layerAction = await dispatch(fetchLayers());
      if (fetchRoutine.fulfilled.match(routineAction) && fetchRoles.fulfilled.match(roleAction) && fetchLayers.fulfilled.match(layerAction)) {
          setStatus('succeeded');
      } else {
          setStatus('failed');
          if (routineAction.payload) {
            setErrors(flattenErrors(routineAction.payload))
          } else if (roleAction.payload) {
            setErrors(flattenErrors(roleAction.payload))
          } else if (layerAction.payload) {
            setErrors(flattenErrors(layerAction.payload))
          } else if (routineAction.error) {
            setErrors({'non_field_errors': routineAction.error.message})
          } else if (roleAction.error) {
            setErrors({'non_field_errors': roleAction.error.message})
          } else if (layerAction.error) {
            setErrors({'non_field_errors': layerAction.error.message})
          } else {
            setErrors({'non_field_errors': 'Unable to fetch routine.'})
          }
      }
    }
    fetch();
  }, [dispatch, routineId]);

  let content

  if (status === 'pending') {
    content = (<Spinner pad="large" size="large" color="status-unknown" />)
  } else if (status === 'succeeded') {
    var layerComponents = []
    layers.forEach((layer) => {
      console.log(layer)
      const role = roles[layer.role]
      layerComponents.push(
          <Box gap="medium" pad={{vertical: "medium"}} key={layer.id}>
            {account.type === 'Team' && (<Text>Assigned to {role.name}</Text>)}
            <Text>Repeats {routine.layers[0].label}</Text>
          </Box>
      )
    })
    content = (
      <Box pad="medium">
        <Box border="bottom">
          <Heading margin="none">{routine.name}</Heading>
          <Paragraph level={2} color="text-xweak">{routine.description}</Paragraph>
        </Box>
        {layerComponents}
      </Box>
    )
  } else if (status === 'failed') {
    content = (
      <Error message={(errors && errors['non_field_errors']) ? errors['non_field_errors'] : undefined} />
    )
  }

  return (
    <Page
      title="Routine"
      action={{
        icon: <Edit />,
        onClick: () => dispatch(push(`/routines/${routineId}/edit`)),
        label: "Edit Routine",
        primary: true
      }}
      previous={() => dispatch(goBack())}
    >
      {content}
    </Page>
  )
};

export default RoutineDetail;
