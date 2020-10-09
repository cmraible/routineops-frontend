import { Button, DataTable, Text } from 'grommet';
import { Add, Checkmark, Close, Organization } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../actions/user.actions';
import { goToOrg } from '../actions/ui.actions';
import { getAllUsers } from '../reducers/reducers';
import AddUserOverlay from './AddUserOverlay';
import UserOverlay from './UserOverlay';
import { getUserRoles } from '../actions/userRole.actions';
import { getRoles } from '../actions/role.actions';
import Page from '../components/Page';

const Users = ({ getUsers, getRoles, getUserRoles, goToOrg, isFetching, users }) => {

  useEffect(() => {
    getUsers()
    getRoles()
    getUserRoles()
  }, [getUsers, getRoles, getUserRoles]);

  const columns = [
    {
      property: 'first_name',
      header: <Text>Name</Text>,
      render: datum => (
        <Text weight="bold">{datum.first_name + ' ' + datum.last_name}</Text>
      )
    },
    {
      property: 'is_org_admin',
      header: <Text>Admin?</Text>,
      align: "center",
      render: datum => (
        (datum.is_org_admin) ? <Checkmark /> : <Close />
      )
    },
    {
      property: 'is_active',
      header: <Text>Active?</Text>,
      align: "center",
      render: datum => (
        (datum.is_active) ? <Checkmark /> : <Close />
      )
    }
  ]

  // Set up state for Add User overlay
  const [openAddUser, setAddUser] = useState(undefined)
  const onOpenAddUser = (event) => {
    window.analytics.track('Clicked Add User button.')
    setAddUser(true);
  }
  const onCloseAddUser = () => setAddUser(undefined)

  // Set up state for Edit User overlay
  const [openUser, setUser] = useState(undefined)
  const onOpenUser = (event) => setUser(event.datum)
  const onCloseUser = () => setUser(undefined)

  const primary_action = (<Button plain icon={<Add />} onClick={onOpenAddUser} />)
  const secondary_action = (<Button plain icon={<Organization />} onClick={goToOrg} />)

  return (
    <Page title="Team" primary_action={primary_action} secondary_action={secondary_action}>
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

export default connect(mapStateToProps, {
  getUsers,
  getRoles,
  getUserRoles,
  goToOrg
})(Users);
