import { Box, Button, Form, FormField, Heading, Layer, List, Select, TextInput } from 'grommet';
import { Add, Close, Trash } from 'grommet-icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { saveUser } from '../actions/user.actions';
import { addUserRole, deleteUserRole } from '../actions/userRole.actions';
import { getUserActiveRoles } from '../reducers/reducers';
import { getAllRoles } from '../reducers/reducers';
import Spinner from './Spinner';


const UserOverlay = ({ user, onClose, saveUser, isFetching, allRoles, rolesById, userRoles, addUserRole, deleteUserRole }) => {

  const [ profile, setProfile ] = useState({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email
  });

  const baseUserRole = {
    user: user.id,
    organization: user.organization,
    role: undefined
  }

  const [ role, setRole ] = useState(baseUserRole)

  const roleOptions = allRoles.filter((role) => {
    return !userRoles.some((userRole) => userRole.role === role.id)
  })

  return (
    <Layer
      position="right"
      onClickOutside={onClose}
      onEsc={onClose}
      pad="medium"
      full="vertical"
      style={{"borderRadius": "0px"}}
    >
      <Box flex={false} width="large">
        <Box align="start">
          <Button icon={(<Close />)} onClick={onClose} />
        </Box>

        <Box flex overflow="scroll" gap="medium" pad="medium">
          <Box direction="row" align="center" gap="large">
            <Heading>Edit User</Heading>
            <Spinner isFetching={isFetching} />
          </Box>

          <Form 
            onSubmit={({value, touch}) => {
              saveUser(value)
              setRole(baseUserRole)
            }}
            value={profile}
            onChange={ nextValue => setProfile(nextValue)}
          >
            <FormField label="First Name">
              <TextInput name="first_name" />
            </FormField>
            <FormField label="Last Name">
              <TextInput name="last_name" />
            </FormField>
            <FormField label="Email Address">
              <TextInput name="email" />
            </FormField>
            <Button type="submit" primary label="Save" />
          </Form>

          <Box>
          <Heading>Edit Roles</Heading>
            <Form
              value={role}
              onSubmit={({value, touch}) => {
                addUserRole(value)
              }}
              onChange={ nextValue => setRole(nextValue)}
            >
              <Box direction="row" align="center" fill="horizontal" gap="small">
                <FormField name="role" fill="horizontal" label="Add a role...">
                  <Select
                    name="role" 
                    placeholder="Select"
                    options={roleOptions}
                    labelKey="name"
                    valueKey={{
                      key: 'id',
                      reduce: true
                    }}
                  />
                </FormField>
                <Button primary icon={<Add />} type="submit" />
              </Box>
              
            </Form>
            <List 
              data={userRoles}
              children={(datum, index) => (
                <Box align="center" direction="row" justify="between">
                  {rolesById[datum.role].name}
                  <Button icon={<Trash size="small" />} onClick={() => deleteUserRole(datum.id)} />
                </Box>
              )}
            />
          </Box>
        </Box>
      </Box>
    </Layer>
  )

};

const mapStateToProps = state => ({
  isFetching: state.user.isFetching,
  rolesById: state.roles.byId,
  allRoles: getAllRoles(state),
  userRoles: getUserActiveRoles(state)
})

export default connect(mapStateToProps, {saveUser, addUserRole, deleteUserRole})(UserOverlay)
