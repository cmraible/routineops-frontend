import { Box, Menu, Text } from 'grommet';
import { Edit, More, Trash, User } from 'grommet-icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListView from '../../components/ListView';
import Spinner from '../../components/Spinner';
import history from '../../history';
import AddRoleForm from './RoleFormAdd';
import { deleteRole, fetchRoles, selectAllRoles, selectRoleById } from './rolesSlice';

const RoleExcerpt = ({id}) => {
  const role = useSelector(state => selectRoleById(state, id));
  return (
    <Box direction="row" justify="between" onClick={() => history.push(`/roles/${id}`)} pad="small">
      <Box direction="row" align="center" gap="medium">
        <User /><Text>{role.name}</Text>
      </Box>
    </Box>
  )
}

const RoleActions = ({ id }) => {
  const dispatch = useDispatch();

  const [requestStatus, setRequestStatus] = useState('idle');


  const handleDelete = async (id) => {
    setRequestStatus('pending');
    const resultAction = await dispatch(deleteRole(id))
    if (!deleteRole.fulfilled.match(resultAction)) {
      setRequestStatus('failed');
      console.log(resultAction.error.message)
    }
  }

  return (
    <Menu
      icon={(requestStatus === 'pending')? <Box pad="small"><Spinner isFetching={true} size="small" /></Box> : <Box pad="small"><More size="small" /></Box>}
      className="action-menu"
      id={`action-menu-${id}`}
      dropAlign={{top: 'top', right: 'right'}}
      justifyContent="end"
      items={[
        { justify: 'center', gap: 'medium', icon: <Box pad="small"><Edit size="small" /></Box>, label: 'Edit', onClick: () => {history.push(`/roles/${id}/edit`)}},
        { justify: 'center', gap: 'medium', icon: <Box pad="small"><Trash size="small" /></Box>, label: 'Delete', onClick: () => {handleDelete(id)}},
      ]}
    />
  )
}

const RoleList = () => {

  return (
    <ListView
      title="Roles"
      previous='/team'
      itemSelector={selectAllRoles}
      fetchAction={fetchRoles}
      renderItem={(role) => (<RoleExcerpt id={role.id} key={role.id} />)}
      header={<AddRoleForm />}
      listActions={(item) => (<RoleActions key={item.id} id={item.id} />)}
      empty={
        <Box pad="small" round="small" align="center" border={{color: "status-critical", size: "small"}} background={{color: "status-critical", opacity: "weak"}}>
          No roles found.
        </Box>}
    />
  )
};

export default RoleList;
