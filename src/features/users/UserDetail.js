import { Box, Button, Heading, List, Select } from 'grommet';
import { Add, Edit, Trash } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/Error';
import Page from '../../components/Page';
import Spinner from '../../components/Spinner';
import { fetchRoles, selectAllRoles, selectRoleById } from '../roles/rolesSlice';
import { addNewUserRole, deleteUserRole, fetchUserRoles, selectActiveUserRolesForUser, selectUserRoleById } from '../userRoles/userRolesSlice';
import { fetchUser, selectUserById } from '../users/usersSlice';
import { push, goBack } from 'connected-react-router';

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
      <Box align="center" direction="row" justify="between">
        {role.name}
        <Button className="delete-userrole" id={`delete-userrole-${id}`} icon={(requestStatus === 'pending') ? <Spinner isFetching={true} size="small" /> : <Trash size="small" />} onClick={handleDeleteUserRole} />
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
    content = (<Spinner pad="large" size="large" color="status-unknown" />)
  } else if (fetchStatus === 'succeeded') {
    content = (
      <Box pad="medium">
        <Error message={(errors && errors['non_field_errors']) ? errors['non_field_errors'] : undefined} />
        <Box direction="row" gap="medium" justify="between">
          <Heading level={2}>Roles</Heading>
          <Select
            plain
            id="role-select"
            size="small"
            value={value}
            onChange={handleAddUserRole}
            disabled={requestStatus === 'pending'}
            options={roleOptions}
            labelKey="name"
            icon={<Add />}
            valueKey={{
              key: 'id',
              reduce: true
            }}
          />
        </Box>

        <List
          data={userRoles}
          children={(datum, index) => <UserRoleExcerpt id={datum.id} key={datum.id} />}
        />
      </Box>
    )
  } else if (fetchStatus === 'failed') {
    content = (
      <Error message={(fetchErrors && fetchErrors['non_field_errors']) ? fetchErrors['non_field_errors'] : undefined} />
    )
  }

  console.log(userRoles)

  return (
    <Page
      title={user.first_name + ' ' + user.last_name}
      previous={() => dispatch(goBack())}
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
