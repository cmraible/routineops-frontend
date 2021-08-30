import { push } from 'connected-react-router';
import { Box, Text, List } from 'grommet';
import { Edit } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/Error';
import Page from '../../components/Page';
import Spinner from '../../components/Spinner';
import { flattenErrors } from '../../utils';
import { fetchLayers, selectLayersForRole } from '../layers/layersSlice';
import { fetchUserRoles, selectUserRolesForRole } from '../userRoles/userRolesSlice';
import { fetchRole, selectRoleById } from './rolesSlice';
import UserItem from '../users/UserItem';
import Description from '../../components/Description';
import RoutineItem from '../routines/RoutineItem';
import { DateTime } from 'luxon';

const RoleDetail = ({match}) => {
  const dispatch = useDispatch();
  const { roleId } = match.params;
  const role = useSelector(state => selectRoleById(state, roleId))
  const userRoles = useSelector(state => selectUserRolesForRole(state, roleId));
  const layers = useSelector(state => selectLayersForRole(state, roleId));

  const [requestStatus, setRequestStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetch = async () => {
        setRequestStatus('pending');
        setErrors({});
        const resultAction = await dispatch(fetchRole(roleId))
        const userRolesAction = await dispatch(fetchUserRoles())
        const layerAction = await dispatch(fetchLayers())
        if (fetchRole.fulfilled.match(resultAction) && fetchUserRoles.fulfilled.match(userRolesAction) && fetchLayers.fulfilled.match(layerAction)) {
            setRequestStatus('succeeded');
        } else {
            setRequestStatus('failed');
            if (resultAction.payload) {
                setErrors(flattenErrors(resultAction.payload))
            } else {
                setErrors({'non_field_errors': resultAction.error.message})
            }
        }
    }
    fetch();
}, [dispatch, roleId]);

  let content

  if (requestStatus === 'pending') {
      content = (<Spinner />)
  } else if (requestStatus === 'succeeded') {
      content = (
        <Box gap="small">
          <Description title="Created on" description={DateTime.fromISO(role.created).toLocaleString()} />
          <Text margin={{horizontal: "small", vertical: "none"}} weight="bold">Users</Text>
          <List 
            pad="none"
            data={userRoles}
            children={(datum, index) => <UserItem id={datum.user} />}
          />
          <Text weight="bold" margin={{horizontal: "small", vertical: "none"}} level={3}>Routines</Text>
          <List 
            data={layers}
            pad="none"
            children={(datum, index) => <RoutineItem id={datum.routine} />}
          />
        </Box>
      )
  } else if (requestStatus === 'failed') {
      content = (
        <Error message={(errors && errors['non_field_errors']) ? errors['non_field_errors'] : undefined} />
      )
  }

  return (
    <Page
      title={role ? `Role: ${role.name}` : 'Role'}
      pad="small"
      action={{
        icon: <Edit />,
        label: "Edit Role",
        onClick: () => dispatch(push(`/roles/${roleId}/edit`)),
        primary: true
      }}
    >
      {content}
    </Page>
  )
};

export default RoleDetail;
