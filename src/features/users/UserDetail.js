import { push } from 'connected-react-router';
import { Box, Button, List, Select, Text } from 'grommet';
import { Add, Checkmark, Close, Edit, Trash } from 'grommet-icons';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Description from '../../components/Description';
import Error from '../../components/Error';
import Page from '../../components/Page';
import Spinner from '../../components/Spinner';
import { fetchRoles, selectAllRoles, selectRoleById } from '../roles/rolesSlice';
import { addNewUserRole, deleteUserRole, fetchUserRoles, selectActiveUserRolesForUser, selectUserRoleById } from '../userRoles/userRolesSlice';
import { fetchUser, selectUserById } from '../users/usersSlice';

const UserRoleExcerpt = ({ id }) => {
  const dispatch = useDispatch();
  const userRole = useSelector(state => selectUserRoleById(state, id))
  const role = useSelector(state => selectRoleById(state, userRole.role))

  const [requestStatus, setRequestStatus] = useState('idle');

  const handleDeleteUserRole = async () => {
    setRequestStatus('pending');
    const resultAction = await dispatch(deleteUserRole(id));
    if (!deleteUserRole.fulfilled.match(resultAction)) {
      setRequestStatus('failed');
    }
  }

  return (
      <Box align="center" direction="row" justify="between" pad="small">
        <Box>
          <Text style={{ lineHeight: '18px'}}>{role.name}</Text>
          <Text style={{ lineHeight: '10px'}} size="xsmall" color="text-xweak">Since {DateTime.fromISO(userRole.created).toLocaleString()}</Text>
        </Box>
        <Button className="delete-userrole" id={`delete-userrole-${id}`} icon={(requestStatus === 'pending') ? <Spinner /> : <Trash size="small" />} onClick={handleDeleteUserRole} />
      </Box>
  )
}

const UserDetail = ({ match, onClose }) => {
  const dispatch = useDispatch()
  const userId = parseInt(match.params.userId);
  const user = useSelector(state => selectUserById(state, userId));
  const userRoles = useSelector(state => selectActiveUserRolesForUser(state, userId));
  const roles = useSelector(selectAllRoles);

  const [fetchStatus, setFetchStatus] = useState('idle');
  const [fetchErrors, setFetchErrors] = useState({})

  useEffect(() => {
    const fetch = async () => {
      setFetchStatus('pending');
      setFetchErrors({});
      const userAction = await dispatch(fetchUser(userId));
      const rolesAction = await dispatch(fetchRoles());
      const userRolesAction = await dispatch(fetchUserRoles());
      if (fetchUser.fulfilled.match(userAction) && fetchRoles.fulfilled.match(rolesAction) && fetchUserRoles.fulfilled.match(userRolesAction)) {
        setFetchStatus('succeeded')
      } else {
        setFetchStatus('failed');
        if (userAction.error) {
          setFetchErrors({'non_field_errors': userAction.error.message})
        }
        if (rolesAction.error) {
          setFetchErrors({'non_field_errors': rolesAction.error.message})
        }
        if (userRolesAction.error) {
          setFetchErrors({'non_field_errors': userRolesAction.error.message})
        }
      }
    }
    fetch();
  }, [dispatch, userId]);

  const roleOptions = roles.filter((role) => {
    return !userRoles.some((userRole) => userRole.role === role.id)
  });

  const [value, setValue] = useState({})
  const [requestStatus, setRequestStatus] = useState('idle')
  const [errors, setErrors] = useState({});

  const baseUserRole = {
    user: user.id,
    account: user.account,
    role: undefined
  };

  const handleAddUserRole = async ({ value, option }) => {
    setRequestStatus('pending')
    const userRole = { ...baseUserRole, role: value}
    const resultAction = await dispatch(addNewUserRole(userRole))
    if (addNewUserRole.fulfilled.match(resultAction)) {
      setRequestStatus('succeeded')
      console.log('succeeded')
    } else {
      setRequestStatus('failed');
      setErrors({'non_field_errors': resultAction.error.message})
    }
    setValue({});
  }

  let content;

  if (fetchStatus === 'pending') {
    content = (<Spinner />)
  } else if (fetchStatus === 'succeeded') {
    content = (
      <Box>
        <Error message={(errors && errors['non_field_errors']) ? errors['non_field_errors'] : undefined} />
        <Description title="Email Address" description={user.email} />
        <Description title="Date Joined" description={DateTime.fromISO(user.date_joined).toLocaleString() } />
        <Description title="Admin" description={user.is_account_admin ? <Checkmark /> : <Close color="status-critical" />} />
        <Description title="Active" description={user.is_active ? <Checkmark /> : <Close color="status-critical" />} />
        <Box direction="row" gap="medium" justify="between" pad={{top:"medium"}}>
          <Text weight="bold" margin={{vertical: "none", horizontal: "small"}}>Roles</Text>
          <Select
            plain
            id="role-select"
            size="small"
            value={value}
            onChange={handleAddUserRole}
            disabled={requestStatus === 'pending'}
            options={roleOptions}
            labelKey="name"
            icon={<Add size="small" />}
            valueKey={{
              key: 'id',
              reduce: true
            }}
          />
        </Box>
        <List
          data={userRoles}
          pad="none"
          children={(datum, index) => <UserRoleExcerpt id={datum.id} key={datum.id} />}
        />
      </Box>
    )
  } else if (fetchStatus === 'failed') {
    content = (
      <Error message={(fetchErrors && fetchErrors['non_field_errors']) ? fetchErrors['non_field_errors'] : undefined} />
    )
  }

  return (
    <Page
      title={user.first_name + ' ' + user.last_name}
      action={{
        icon: <Edit />,
        onClick: () => dispatch(push(`/users/${userId}/edit`)),
        label: "Edit User"
      }}
      pad="small"
    >
      {content}
    </Page>
  )

};

export default UserDetail;
