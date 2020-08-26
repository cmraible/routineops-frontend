import { Box, Form, List, Text } from 'grommet';
import { User } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addRole, getRoles } from '../actions/role.actions';
import { goToRole } from '../actions/ui.actions';
import { getAllRoles, getLoggedInUser, getAllUserRoles } from '../reducers/reducers';
import SplitPage from '../components/SplitPage';
import Role from './Role';
import { getTaskLayers } from '../actions/taskLayer.actions';
import { getUserRoles } from '../actions/userRole.actions';
import InlineInput from '../components/InlineInput';


const Roles = ({ organization, roles, addRole, getRoles, isFetching, errors, match, rolesById, getTaskLayers, getUserRoles, userRoles }) => {

  const role_id = match.params.role_id

  const [value, setValue] = useState({
    name: ''
  });

  useEffect(() => {
    getTaskLayers();
    getRoles();
    getUserRoles();
  }, [getRoles, getTaskLayers, getUserRoles]);

  const renderRoles = (role, index) => {
    return (
      <Box direction="row" justify="between">
        <Box direction="row" align="center" gap="medium">
          <User /><Text>{role.name}</Text>
        </Box>
        <Text>{userRoles.filter((userRole) => userRole.role === role.id).length}</Text>
      </Box>
      
    )
  }
  const [selected, setSelected] = React.useState(roles.findIndex((role) => role.id === role_id ));

  const handleSubmit = ({ value }) => {
    addRole({
      organization: organization.id,
      name: value.name
    });
    setSelected(roles.findIndex((role) => role.name === value.name))
    setValue({name: ''});
  }

  const detailView = (props) => {
    return (role_id && 
      <Role role={rolesById[role_id]} />
    )
  }


  return (
    <SplitPage title="Roles" detailView={detailView} detail={(role_id) ? true : false }>
      <Box flex={false} direction="column">
        <Box direction="column" margin={{top: "medium"}}>
          <Form
            onSubmit={handleSubmit}
            value={value}
            onChange={ nextValue => setValue(nextValue) }
          >
            <InlineInput required name="name" placeholder="Type here to create a new role" />
          </Form>
          <Box margin={{top: "medium"}} pad={{horizontal: "medium"}} direction="row" align="center" justify="between">
            <Text margin={{left: "large"}} weight="bold" size="small">Name</Text>
            <Text weight="bold" size="small"># Users Assigned</Text>
          </Box>
          <List
            primaryKey="name"
            data={roles}
            children={renderRoles}
            itemProps={
              selected >= 0 ? { [selected]: { background: 'brand' } } : undefined
            }
            onClickItem={(event) => {
              setSelected(selected === event.index ? undefined : event.index);
              goToRole(event.item.id);
            }}
          />
        </Box>
      </Box>
    </SplitPage>
  )

};

const mapStateToProps = state => ({
  organization: state.organization.organization,
  user: getLoggedInUser(state),
  roles: getAllRoles(state),
  userRoles: getAllUserRoles(state),
  rolesById: state.roles.byId,
  isFetching: state.roles.isFetching,
  errors: state.roles.errors
});

export default connect(mapStateToProps, {
  addRole, 
  getRoles, 
  getTaskLayers,
  getUserRoles
 })(Roles);
