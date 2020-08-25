import { Box, Menu, Form } from 'grommet';
import { Trash, User, UserAdd, More } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { deleteRole, getRole, saveRole } from '../actions/role.actions';
import { goToRoles } from '../actions/ui.actions';
import ConfirmDelete from '../components/ConfirmDelete';
import InlineInput from '../components/InlineInput';
import AssignUser from './AssignUser';

const RoleForm = ({ role, getRole, deleteRole, saveRole, isFetching, errors, goToRoles }) => {
  
  // Set up state for Task form
  const [roleValue, setRoleValue] = useState({
    id: role.id,
    name: role.name,
    organization: role.organization
  })

  useEffect(() => {
    setRoleValue({
      id: role.id,
      name: role.name,
      organization: role.organization
    })
  }, [setRoleValue, role]);

  // Setup state for delete confirm overlay
  const [openDelete, setOpenDelete] = useState()
  const onOpenDelete = (event) => setOpenDelete(true);
  const onCloseDelete = () => setOpenDelete(undefined);
  const [assignUser, setAssignUser] = useState(undefined);

  // Define function to delete a task
  const onDelete = (role_id) => {
    deleteRole(role_id)
    goToRoles()
  }

  // Define what happens when the task form is submitted
  const submitForm = (value) => {
    console.log(value);
    saveRole(value)
  }

  const actionItems = [
    {
      label: 'Assign a user',
      gap: 'small',
      icon: <UserAdd color="text" />,
      onClick: () => setAssignUser(true)
    },
    {
      label: 'Delete role',
      gap: 'small',
      icon: <Trash color="text" />,
      onClick: (event) => onOpenDelete(event)
    }
  ]

  return (
        <Box fill="horizontal">
          <Form
            value={roleValue}
            onChange={ nextValue => setRoleValue(nextValue) }
            onSubmit={({value}) => submitForm(value)}
          >
            <Box direction="row" align="center" justify="between">
              <InlineInput name="name" icon={<User color="text" />} size="xxlarge" onSave={() => {submitForm(roleValue)}} />
              <Menu icon={<More />} items={actionItems}/>
            </Box>
          </Form>
          {
            openDelete && !errors &&
            <ConfirmDelete 
              onClick={() => onDelete(role.id)} 
              onClose={onCloseDelete}
              message="This action will permanently delete this role and all data associated with it."
            />
          }
          {
            assignUser &&
            <AssignUser 
              onClose={() => setAssignUser(undefined)}
              role={role}
            />
          }
        </Box>


  )

};

const mapStateToProps = (state) => ({
  
})

export default connect(mapStateToProps, {
  getRole,
  saveRole,
  deleteRole,
  goToRoles
})(RoleForm)
