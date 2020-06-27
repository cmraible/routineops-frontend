import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Form, Heading, List, Main, Text, TextInput } from 'grommet';
import { Add, Subtract } from 'grommet-icons';
import { addRole, getRoles, deleteRole } from '../actions/role.actions'


const Roles = ({ organization, roles, addRole, getRoles, deleteRole }) => {

  const [value, setValue] = useState({
    name: ''
  });

  useEffect(() => {
    getRoles(organization.id)
  }, []);

  const renderChildren = (datum, index) => {
    return (
      <Box direction="row" justify="between" align="center">
        <Text>{datum.name}</Text>
        <Button
          size="small"
          icon={<Subtract />}
          primary
          color="status-critical"
          onClick={() => {
            deleteRole(datum.id)
          }}
        />
      </Box>
    )
  }

  return (
    <Main pad="medium" fill="horizontal" >
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
        />
      </Box>
    </Main>
  )

};

const mapStateToProps = state => {
  return {
    organization: state.organization,
    user: state.user,
    roles: state.roles
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addRole: (role) => {
      dispatch(addRole(role))
    },
    getRoles: (organization_id) => {
      dispatch(getRoles(organization_id))
    },
    deleteRole: (role_id) => {
      dispatch(deleteRole(role_id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
