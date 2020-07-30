import { Box, Button, DataTable, Text } from 'grommet';
import { Add, Checkmark, Close } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../actions/user.actions';
import { getAllUsers } from '../reducers/reducers';
import AddUserOverlay from './AddUserOverlay';
import UserOverlay from './UserOverlay';
import { getUserRoles } from '../actions/userRole.actions';
import { getRoles } from '../actions/role.actions';
import { Mixpanel } from '../mixpanel';
import Page from '../components/Page';

const Users = ({ getUsers, getRoles, getUserRoles, isFetching, users }) => {

  useEffect(() => {
    getUsers()
    getRoles()
    getUserRoles()
  }, [getUsers, getRoles, getUserRoles]);

  const columns = [
    {
      property: 'email',
      header: <Text>Email Address</Text>,
      primary: true
    },
    {
      property: 'first_name',
      header: <Text>First Name</Text>,
    },
    {
      property: 'last_name',
      header: <Text>Last Name</Text>
    },
    {
      property: 'is_org_admin',
      header: <Text>Admin?</Text>,
      align: "center",
      render: datum => (
        (datum) ? <Checkmark /> : <Close />
      )
    },
    {
      property: 'is_active',
      header: <Text>Active?</Text>,
      align: "center",
      render: datum => (
        (datum) ? <Checkmark /> : <Close />
      )
    }
  ]

  // Set up state for Add User overlay
  const [openAddUser, setAddUser] = useState(undefined)
  const onOpenAddUser = (event) => {
    Mixpanel.track('Clicked Add User button.')
    setAddUser(true);
  }
  const onCloseAddUser = () => setAddUser(undefined)

  // Set up state for Edit User overlay
  const [openUser, setUser] = useState(undefined)
  const onOpenUser = (event) => setUser(event.datum)
  const onCloseUser = () => setUser(undefined)



  return (
    <Page title="Users">
      <Box>
        <Button primary icon={<Add />} label="Add" onClick={onOpenAddUser} />
      </Box>
      <DataTable 
        primaryKey="email"
        data={users}
        columns={columns}
        onClickRow={(event) => onOpenUser(event)}
      />
      { openAddUser && (<AddUserOverlay onClose={onCloseAddUser} />) }
      { openUser && (<UserOverlay onClose={onCloseUser} user={openUser} />) }
    </Page>
    
  )

};

const mapStateToProps = state => ({
  users: getAllUsers(state),
  isFetching: state.users.isFetching
});

export default connect(mapStateToProps, { getUsers, getRoles, getUserRoles })(Users);