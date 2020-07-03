import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Form, Heading, List, Main, Text, TextInput } from 'grommet';
import { Add, Subtract } from 'grommet-icons';
import { addRole, getRoles, deleteRole } from '../actions/role.actions'
import { getAllRoles } from '../reducers/reducers';
import RoleOverlay from './RoleOverlay';


const Roles = ({ organization, roles, addRole, getRoles, deleteRole }) => {

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
      <Box direction="row" justify="between" align="center">
        <Text>{datum.name}</Text>
      </Box>
    )
  }

  return (
    <Main fill="horizontal" margin={{bottom:"large"}} pad="medium" >
      <Heading>Roles</Heading>
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
          onClickItem={onOpenRole}
        />
        {
          openRole && (
            <RoleOverlay role={openRole} onClose={onCloseRole} deleteRole={deleteRole} />
          )
        }
      </Box>
    </Main>
  )

};

const mapStateToProps = state => ({
  organization: state.organization,
  user: state.user,
  roles: getAllRoles(state)
});

export default connect(mapStateToProps, {addRole: addRole, getRoles: getRoles, deleteRole: deleteRole })(Roles);
