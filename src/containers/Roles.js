import { Box, Button, Form, List, Text, TextInput } from 'grommet';
import { Add, User } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addRole, deleteRole, getRoles } from '../actions/role.actions';
import { goToRole } from '../actions/ui.actions';
import { getAllRoles, getLoggedInUser } from '../reducers/reducers';
import Page from '../components/Page';


const Roles = ({ organization, roles, addRole, getRoles, deleteRole, isFetching, errors }) => {

  const [value, setValue] = useState({
    name: ''
  });

  useEffect(() => {
    getRoles();
  }, [getRoles]);

  const renderRoles = (role, index) => {
    return (
      <Box direction="row" align="center" gap="medium">
        <User /><Text>{role.name}</Text>
      </Box>
    )
  }

  const handleSubmit = ({ value }) => {
    addRole({
      organization: organization.id,
      name: value.name
    });
    setValue({name: ''});
  }

  return (
    <Page title="Roles">
      <Box flex={false}>
        <Box direction="column" gap="medium">
          <Form
            onSubmit={handleSubmit}
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
            children={renderRoles}
            onClickItem={(event) => goToRole(event.item.id)}
          />
        </Box>
      </Box>
      
    </Page>
  )

};

const mapStateToProps = state => ({
  organization: state.organization.organization,
  user: getLoggedInUser(state),
  roles: getAllRoles(state),
  isFetching: state.roles.isFetching,
  errors: state.roles.errors
});

export default connect(mapStateToProps, {addRole: addRole, getRoles: getRoles, deleteRole: deleteRole })(Roles);
