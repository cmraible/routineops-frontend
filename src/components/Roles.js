import { Box, Button, Form, Heading, List, Text, TextInput } from 'grommet';
import { Add, User } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addRole, deleteRole, getRoles } from '../actions/role.actions';
import { goToRole } from '../actions/ui.actions';
import { getAllRoles } from '../reducers/reducers';
import RoleOverlay from './RoleOverlay';
import Spinner from './Spinner';


const Roles = ({ organization, roles, addRole, getRoles, deleteRole, isFetching }) => {

  const [value, setValue] = useState({
    name: ''
  });

  const [openRole, setOpenRole] = useState()

  const onOpenRole = (event) => setOpenRole(event.item);

  const onCloseRole = () => setOpenRole(undefined);


  useEffect(() => {
    getRoles(organization.id)
  }, [getRoles, organization.id]);

  const renderChildren = (datum, index) => {
    return (
      <Box direction="row" align="center" gap="medium">
        <User /><Text>{datum.name}</Text>
      </Box>
    )
  }

  return (
    <Box pad="medium" fill="vertical" overflow="auto" flex={true}>
      <Box flex={false}>
        <Box direction="row" align="center" gap="large">
          <Heading>Roles</Heading>
          {((isFetching) && <Spinner />) }
        </Box>
        
        <Box direction="column" gap="large">
          <Form
            onSubmit={({value, touch}) => {
              addRole({
                organization: organization.id,
                name: value.name
              })
              setValue({name: ''})
            }}
            value={value}
            onChange={ nextValue => setValue(nextValue) }
          >
            <Box direction="row" gap="small">
              <TextInput required name="name" placeholder="New role" />
              <Button type="submit" size="small" primary icon={<Add />} />
            </Box>
          </Form>
          <List
            primaryKey="name"
            data={roles}
            children={renderChildren}
            onClickItem={(event) => goToRole(event.item.id)}
          />
          {
            openRole && (
              <RoleOverlay role={openRole} onClose={onCloseRole} deleteRole={deleteRole} />
            )
          }
        </Box>
      </Box>
      
    </Box>
  )

};

const mapStateToProps = state => ({
  organization: state.organization,
  user: state.user,
  roles: getAllRoles(state),
  isFetching: state.roles.isFetching
});

export default connect(mapStateToProps, {addRole: addRole, getRoles: getRoles, deleteRole: deleteRole })(Roles);
