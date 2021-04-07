import { push } from 'connected-react-router';
import { Box } from 'grommet';
import React from 'react';
import { useDispatch } from 'react-redux';
import ListView from '../../components/ListView';
import AddRoleForm from './AddRoleForm';
import RoleItem from './RoleItem';
import { fetchRoles, selectAllRoles } from './rolesSlice';


const RoleList = () => {
  const dispatch = useDispatch()

  return (
    <ListView
      title="Roles"
      onClickItem={(datum, index) => {console.log(datum); dispatch(push(`/roles/${datum.item.id}`))}}
      itemSelector={selectAllRoles}
      fetchAction={fetchRoles}
      renderItem={(role) => (<RoleItem id={role.id} key={role.id} />)}
      header={<Box pad={{vertical: "medium", horizontal: "small"}}><AddRoleForm /></Box>}
      //listActions={(item) => (<RoleActions key={item.id} id={item.id} />)}
      pad="none"
      empty={
        <Box pad="small" round="small" align="center" border={{color: "status-critical", size: "small"}} background={{color: "status-critical", opacity: "weak"}}>
          No roles found.
        </Box>}
    />
  )
};

export default RoleList;
