import { Box, Text } from 'grommet';
import { CircleInformation } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';
import AddRoleForm from './AddRoleForm';
import RoleItem from './RoleItem';
import { fetchRoles, selectRoleIds } from './rolesSlice';

const RoleList = () => {
  const dispatch = useDispatch();
  const roleIds = useSelector(selectRoleIds);

  const [requestStatus, setRequestStatus] = useState('idle');

  useEffect(() => {
    const fetch = async () => {
      setRequestStatus('pending');
      const resultAction = await dispatch(fetchRoles())
      if (fetchRoles.fulfilled.match(resultAction)) {
        setRequestStatus('succeeded');
      } else {
        setRequestStatus('failed');
      }
    }
    fetch()
  }, [dispatch]);

  let content
  if (requestStatus === 'pending') {
    // Display a spinner to indicate loading state
    content = (<Spinner />)
  } else if (requestStatus === 'succeeded') {
    if (roleIds.length > 0) {
      // Display list of roles
      var items = []
      roleIds.forEach((roleId) => {
        items.push(<RoleItem id={roleId} />)
      });
      content = <Box>{items}</Box>
    } else {
      // Display a message saying there are no roles
      content = (
        <Box gap="medium" align="center" pad="medium">
            <CircleInformation />
          <>
          <Text size="large">You don't have any roles yet.</Text>
          <Text size="medium">To create a role, type in the box above and hit enter.</Text>
          </>
        </Box>
      )
    }
  } else if (requestStatus === 'failed') {
    // Display an error message
    content = <Message type="error" message="Unable to fetch roles." />
  }

  return (
    <Box fill>
      <Box gap="medium" fill>
        {/* Header - Role Form */}
        <Box pad="small"><AddRoleForm /></Box>
        {/* Body - Role List */}
        {content}
      </Box>
    </Box>
  )
};

export default RoleList;
